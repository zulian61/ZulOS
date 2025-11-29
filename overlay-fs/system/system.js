// Loading animation to 100%
for (var i = 1; i <= 100; i++) {
    CatCore.loadProgress(i);
    await CatCore.delay(0.01 *CatCore.SECOND);
}

// Stop booting
CatCore.loadProgress();

CatCore.backgroundColor("white");
CatCore.textColor("black");
var history = "";
var command = "";
function renderTerminal() {
    CatCore.text(`${history}$ ${command}`);
}
renderTerminal();
CatCore.backgroundColor("black");
CatCore.textColor("white");
CatCore.textFont("monospace");

CatCore.keyboard.on("hold", event => {
    if (event.key == "Backspace") {
        command = command.slice(0, -1);
    } else if (event.letter == "Enter") {
        switch(command) {
            case "help":
                history += `$ ${command}\nzulfetch - shows specifications of your machine\nmeow - meows at you\nclear - clears terminal\nver - shows version of ZulOS\n`;
                break;
            case "meow":
                history += `$ ${command}\nMEOW MEOW!!\n`;
                break;
            case "zulfetch":
                var devices = CatCore.getDevices();
                history += `$ ${command}\n`;
                history += `CPU: ${devices.processors[0].model} ${devices.processors[0].speed.GHz} GHz (${devices.processors[0].cores})\n`;
                history += `Memory: ${parseFloat((devices.memory.used.GB - devices.swap.used.GB).toFixed(1))} GB / ${parseFloat(devices.memory.capacity.GB.toFixed(1))} GB\n`;
                history += `GPU: ${devices.videocards[0].model}\n`;
                history += `Screen: ${devices.screens[0].width} x ${devices.screens[0].height} ${devices.screens[0].refreshRate.Hz} Hz\n`
                history += ``
                break;
            case "clear":
                history = "";
                break;
            case "ver":
                history += `$ ${command}\n${CatCore.systemName} ${CatCore.systemVersion}\n`
                break;
            default:
                history += `$ ${command}\nUnknown command.\n`;
                break;

        }
        command = "";
    } else if (!["Control", "Alt", "Shift", "Meta", "CapsLock", "Escape", "Tab", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"].includes(event.letter)) {
        command += event.letter;
    }
    renderTerminal();
});