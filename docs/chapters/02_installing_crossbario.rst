################################
Creating a Crossbar.io Publisher
################################

Downloading pip and crossbar: 
================

Download pip: 

.. code-block:: 

    apt install python3-pip
    
    python -m ensurepip
    python -m pip install -U pip

Install crossbar via pip3 (pyhthon3 is required):

.. code-block:: 

     pip3 install crossbar


Installing autobahn.js via npm:
===============================

Installing nodejs and npm: 

.. code-block:: 

    wget https://nodejs.org/dist/v6.10.1/node-v6.10.1-linux-x64.tar.xz
    tar xvf node-v6.10.1-linux-x64.tar.xz
    export PATH=${HOME}/node-v6.10.1-linux-x64/bin:${PATH}
    export NODE_PATH=${HOME}/node-v6.10.1-linux-x64/lib/node_modules

Installing autobahn and websocket functionality: 

.. code-block:: 

    sudo npm install autobahn
    sudo npm install ws@2

Downloading crossbar libraries and autobahn.js repos:
=====================================================

.. code-block:: 

    git clone https://github.com/crossbario/autobahn-js.git
