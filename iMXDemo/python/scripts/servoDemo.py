print ('################################################################################')
print ('#                                                                              #')
print ('#                 Script for Moving Robot servos from min to                   #')
print ('#                 max for inital video Demo of functionality                   #')
print ('#                                                                              #')
print ('################################################################################')

print('For VALUE please insert values between 106(307) for min and 516 for max!!!')

# Import the PCA9685 module.
import Adafruit_PCA9685
import zerorpc

# Uncomment to enable debug output.
#import logging
#logging.basicConfig(level=logging.DEBUG)

# Initialise the PCA9685 using the default address (0x40).
pwm = Adafruit_PCA9685.PCA9685()

# Alternatively specify a different address and/or bus:
#pwm = Adafruit_PCA9685.PCA9685(address=0x41, busnum=2)

# Configure min and max servo pulse lengths
servo_middle = 307 # Middle value for testing
servo_min = 106  # Min pulse length out of 4096 - default value is 106 / 307 for servo 1
servo_max = 516  # Max pulse length out of 4096 - default value is 516

# Helper function to make setting a servo pulse width simpler.
def set_servo_pulse(channel, pulse):
    pulse_length = 1000000    # 1,000,000 us per second
    pulse_length //= 50       # 50 Hz
    print('{0}us per period'.format(pulse_length))
    pulse_length //= 4096     # 12 bits of resolution
    print('{0}us per bit'.format(pulse_length))
    pulse *= 1000
    pulse //= pulse_length
    pwm.set_pwm(channel, 3, pulse)

# Set frequency to 50hz, good for servos. - default value is 47
pwm.set_pwm_freq(47)

class MoveServos(object):
    def moveServoOne(self, pulse):
        print('Moving servo on channel 1, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(1, 3, pulse)
            time.sleep(1)
            return "Servo 1 should move"

        
    def moveServoTwo(self, pulse):
        print('Moving servo on channel 2, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(2, 3, pulse)
            time.sleep(1)


    def moveServoThree(self, pulse):
        print('Moving servo on channel 3, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(3, 3, pulse)
            time.sleep(1)
            return "Servo 3 should move"


    def moveServoFour(self, pulse):
        print('Moving servo on channel 4, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(4, 3, pulse)
            time.sleep(1)
            return "Servo 4 should move"


    def moveServoFive(self, pulse):
        print('Moving servo on channel 5, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(5, 3, pulse)
            time.sleep(1)
            return "Servo 5 should move"


    def moveServoSix(self, pulse):
        print('Moving servo on channel 6, press Ctrl-C to quit...')
        while True:    
            # Move servo on channel O between extremes.
            #pwm.set_pwm(3, 3, servo_middle)
            pwm.set_pwm(6, 3, pulse)
            time.sleep(1)
            return "Servo 6 should move"


s = zerorpc.Server(MoveServos())
s.bind("tcp://0.0.0.0:4242")
s.run()
