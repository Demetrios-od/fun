This program allows sending USSD requests and getting answers for them. It had been written and tested for Huawei E1550 modem.

Preparing to install:

1. Install packages: perl, perl-ExtUtils-MakeMaker
2. Extract content of the archive to some folder.
   The archive called "Device-GSM-1.54".
3. Execute next commands inside that folder:
      perl Makefile.PL
      make
      (make test)
      make install
4. Copy "ussd" file to /usr/bin and make it executable.

Have fun!
