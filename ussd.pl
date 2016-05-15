#!/usr/bin/perl

use Getopt::Std;
use Device::Gsm::Pdu;

# defaults
$opt{r} = "/dev/ttyUSB2";
$opt{s} = "/dev/ttyUSB0";

my $USAGE = <<__EOU;

Usage: $0 [-s input_port] [-r output_port] [-n] [-h] [-v] ussd_msg

Description:
  Send and receive 7-bit PDU-encoded USSD messages.
  Written and tested for Huawei E1550 GSM/UMTS USB modem.

Options:
  -r port   Port to receive data from. Default: $opt{r}
  -s port   Port to send AT commands to. Default: $opt{s}
  -n        Do not send any data to port. Useful with -v.
  -h        Print this help.
  -v        Be verbose.
__EOU

sub HELP_MESSAGE {print "$USAGE\n"; exit;};
#sub VERSION_MESSAGE {};
getopts('r:s:hnv', \%opt);
HELP_MESSAGE() and exit if (! $ARGV[0]) or defined($opt{h});

print "USSD MSG: $ARGV[0]\n" if $opt{v};
my $ussd_req = Device::Gsm::Pdu::encode_text7($ARGV[0]);
# my $ussd_req = Device::Gsm::Pdu::encode_address($ARGV[0]);
$ussd_req =~ s/^..//;
print "PDU ENCODED: $ussd_req\n" if $opt{v};

my $ussd_reply;
if (! $opt{n}) {
    open (SENDPORT, '+<', $opt{s}) or die ("Can't open ",$opt{s},": $!\n");
    open (RCVPORT, $opt{r}) or die ("Can't open ",$opt{r},": $!\n");
    print SENDPORT "AT+CUSD=1,",$ussd_req,",15\r\n";
    #print SENDPORT 'AT+CUSD=1,"',$ussd_req,'",15';
    close SENDPORT;
    print "Waiting for USSD reply...\n" if $opt{v};
    while (<RCVPORT>) {
        chomp;
        die "USSD ERROR\n" if $_ eq "+CUSD: 2";
        if (/^\+CUSD: 0,\"([A-F0-9]+)\"/) {
            $ussd_reply = $_;
            print "PDU USSD REPLY: $ussd_reply\n" if $opt{v};
            last;
        }
        print "Got unknown USSD message: $_\n" if /^\+CUSD:/ and $opt{v};
    }
}

if ($ussd_reply) {
    $ussd_reply =~ s/^\+CUSD: 0,\"//;
    $ussd_reply =~ s/\",15(.+)$//;
    $decoded_ussd_reply = Device::Gsm::Pdu::decode_text7('00'.$ussd_reply);
    #$decoded_ussd_reply = Device::Gsm::Pdu::decode_address('00'.$ussd_reply);
    print STDOUT "USSD REPLY: $decoded_ussd_reply\n";
}
else {print "No USSD reply!\n";}

