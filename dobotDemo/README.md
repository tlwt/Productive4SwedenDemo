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
```

## dobotdemo (101):
### (Network D: 9292)

```
0x93ed8D225874bd2ED0A1d7c4FE3850aE9B0a24Bf
```

Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-39-36.196705689Z--93ed8d225874bd2ed0a1d7c4fe3850ae9b0a24bf

```
{"address":"93ed8d225874bd2ed0a1d7c4fe3850ae9b0a24bf","crypto":{"cipher":"aes-128-ctr","ciphertext":"59d725a05174f4cfd6c867861a4d9fa303097aeecc036ed0c0e38528fd42b233","cipherparams":{"iv":"bc6e6066c1945146037aaed303b50502"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"bdae1d85d07bcd440d68fc9e551d6327a55bbf492f6874f027f18b5e15001599"},"mac":"ed9e65583ddd00aed3ec12dbfb9aebe6c0df3e5b035060159907d0d32262a8eb"},"id":"e4f17872-5a35-4645-871e-c690fdf28d20","version":3}
```

```
"enode://b242ffa5e76c9273e284b4b78e300ef96d5b46ba04607ccb9e88d9df93c32157fcf66ada28c52c49201c372fcc7eeb50525d154b1c4860de0d6bd14e9d3287e5@89.144.27.101:30303"
```

```
 0xF0780Ccf2cb93A8e9EA46CE07aB9DeFac9d6FB91
 ```
Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-39-48.077792249Z--f0780ccf2cb93a8e9ea46ce07ab9defac9d6fb91

```
{"address":"f0780ccf2cb93a8e9ea46ce07ab9defac9d6fb91","crypto":{"cipher":"aes-128-ctr","ciphertext":"cad8dfb97c30280033addd2f82644d03cf7533deb35d1f7a843e7418b0279327","cipherparams":{"iv":"4a87397b28012cc72a1f84884fe00671"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"adc0aaca925c98b5ff8804faef0c4f33daf23228fb6ef9498a2e26b643b2146e"},"mac":"ce7ed74776881e48e9a2954bc416cd2e99f86f66bbea46d3c191b69571e8b7c4"},"id":"be4656e2-5267-42b1-95f5-2367b987f3c6","version":3}
```

```
"enode://a7fa3f761f448bfd0f7320d949c9d6d11aea7da7ec794088109b824f1db8ba26a8709e6cb2ffd8d522bcd956ae8af8571fd24a3062554a3599aba760eaa8dbb4@89.144.27.103:30303"
```

```
0x7086Ca51AFE84130E150C56c2A386d6bbB8eaC51
```
Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-40-00.994558964Z--7086ca51afe84130e150c56c2a386d6bbb8eac51

```
{"address":"7086ca51afe84130e150c56c2a386d6bbb8eac51","crypto":{"cipher":"aes-128-ctr","ciphertext":"11ca506b9851bd7360ebcbd3075e2079af9834ab95c0c94a21e6b781e11df4b7","cipherparams":{"iv":"df5c29dc8e425ccbd421afef55d8e6bf"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"e6f3693e3e14c348b4ffeb03ea135268ede6b308729d3532b3ff4275bd066b90"},"mac":"9049b386712f09913095a2c2889907c7c5d45e452f5b8972c917d3f75e25e920"},"id":"9c0233eb-1b3b-43c9-bd97-cb7440365630","version":3}
```

```
0xf5e937ffd5B4B7493246Df62821fe46e858F0dEA
```
Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-45-14.296495377Z--f5e937ffd5b4b7493246df62821fe46e858f0dea

```
{"address":"f5e937ffd5b4b7493246df62821fe46e858f0dea","crypto":{"cipher":"aes-128-ctr","ciphertext":"ec23f1da867c3209bce2ba83ce3a6866e108050aa13c036aca6b70ee8617b294","cipherparams":{"iv":"65aed67f28b577b1822cfd8894fac4ef"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"162798cb7f8cb20eeb88d1304b49753d6b46fc3c90d02e8fe3edd7b60a771a0e"},"mac":"07f2639eae4c5cca76a0387aa362dfa7fbb465acab20d04e645d1f87ab02c169"},"id":"6b78784b-7549-48e1-9d2d-f8c4c31df480","version":3}
```

```
0xD406Ecb6FDe78969C9c555d18Af5835e3619a8CA
```
Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-45-26.382230924Z--d406ecb6fde78969c9c555d18af5835e3619a8ca

```
{"address":"d406ecb6fde78969c9c555d18af5835e3619a8ca","crypto":{"cipher":"aes-128-ctr","ciphertext":"9021d399966fc7164a9e6bb852c076d765754e3ae8d2988ac85cb7d7988db1db","cipherparams":{"iv":"7fc43f2d2bcb615e8d8e1cd93b0147b2"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"109d6a7605b21f990bcc22cf5f4831e938014cc116334d44992f1a17dd32cf6a"},"mac":"e2e1ff63f0eaed860022c69585892a72d49981097bee2ffa066efa75be411029"},"id":"a6f52346-e5bb-44e8-8aca-68bd0e7a96fe","version":3}
```


### RPC Node:
```
0x2B0Bc8491eB84814F70e66e864caf429af492617
```
Path of the secret key file: /root/.ethereum/keystore/UTC--2019-10-16T13-45-38.387312577Z--2b0bc8491eb84814f70e66e864caf429af492617

```
{"address":"2b0bc8491eb84814f70e66e864caf429af492617","crypto":{"cipher":"aes-128-ctr","ciphertext":"c939a4fc51e556ef1369c97ce8d9570de229993a0d50dbb9ce2f50b820add330","cipherparams":{"iv":"d929d59d31c7ea941d0b68126104e6ee"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"194cc601fe5a5ecee9d5ed6bc68c9e1738213c1aaf81310209f1f629edbd1864"},"mac":"fe35a390fcdd56959af9a1681d738f3b61328162352283d7b30d1107f521b4a9"},"id":"9cdfd009-6a0c-4569-a9f6-472f029cd686","version":3}
```

```
"enode://9d57271193f61c85998cb92b2d63607e75fe791c3a89f4499f153f7569b4600dbf43cfdea3c88e9e40ea1f6a2e297122a34d19ba89fb126422cb6173a1aa69a6@89.144.27.101:30308"
```

## Password:
```
dobotdemo
```
