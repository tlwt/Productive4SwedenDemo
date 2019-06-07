# i.MX Dobot Server Setup 

## Currently the kernel module has to be uploaded manually (new image created but needs to be tested)

```
insmod /lib/modules/4.9.88-imx_4.9.88_2.0.0_ga+g5e23f9d/kernel/drivers/usb/serial/cp210x.ko

```

Also possible solution without using the new image (However no long time fix)

```
depmod -a
```

### Note: neues Image auf dem Sharepoint

### Starting the Dobot server with home position flag:
```
./Dobot_Server -d ttyUSB0 -i
```

Basic python client structure for connecting to the Dobot Server: 

```
import os
import sys
import socket

socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socketClient.connect(("localhost", 50001))
