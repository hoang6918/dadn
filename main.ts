function DHT20 () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P1,
    true,
    false,
    true
    )
    NPNLCD.ShowNumber(dht11_dht22.readData(dataType.temperature), 0, 0)
    NPNLCD.ShowNumber(dht11_dht22.readData(dataType.humidity), 0, 1)
}
function TEMP_AND_FAN () {
    if (input.temperature() >= 35) {
        basic.showNumber(input.temperature())
        basic.showString("Hot")
        basic.clearScreen()
    } else if (input.temperature() <= 12) {
        basic.showNumber(input.temperature())
        basic.showString("Cold")
        basic.clearScreen()
    } else {
        basic.showNumber(input.temperature())
        basic.clearScreen()
    }
    basic.pause(2000)
}
function MOISTURE_AND_PUMP () {
    if (NPNBitKit.AnalogSoilMosture(AnalogPin.P0) < 30) {
        NPNBitKit.Relay(DigitalPin.P2, true)
    } else {
        NPNBitKit.Relay(DigitalPin.P2, false)
    }
    basic.pause(2000)
}
function LIGHT_AND_LED () {
    if (pins.analogReadPin(AnalogPin.P3) < 350) {
        pins.digitalWritePin(DigitalPin.P5, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P5, 0)
    }
    basic.pause(2000)
}
WiFiBit.connectToWiFiNetwork("SSID", "key")
ESP8266_IoT.adafruit_setting("tringuyennek", "123456789")
NPNLCD.LcdInit(39)
NPNLCD.on()
let temp = input.temperature()
basic.forever(function () {
    NPNLCD.clear()
    DHT20()
    MOISTURE_AND_PUMP()
    LIGHT_AND_LED()
    TEMP_AND_FAN()
})
