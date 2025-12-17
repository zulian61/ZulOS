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
var win = null;
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
                history += `CPU: ${devices.processors[0].brand} ${devices.processors[0].model} ${devices.processors[0].speed.GHz} GHz (${devices.processors[0].cores})\n`;
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
            case "win":
                win = new CatCore.Graphics.Window;
                win.open();
                break;
            case "winkill":
                win.close();
                break;
            case "qemu":
                var proc = new CatCore.Process({
                    "type": CatCore.ProcessType.APP,
                    "path": "/bin/qemu-system-aarch64.app",
                    "args": "-machine virt,accel=hvf -cpu host -smp 4 -m 6G -drive if=pflash,format=raw,readonly=on,file=/data/code.fd -drive if=pflash,format=raw,file=/data/vars.fd -device ramfb -device qemu-xhci,id=xhci -device usb-kbd,bus=xhci.0 -device usb-mouse,bus=xhci.0 -drive file=/data/disk0.qcow2,if=none,id=sigma -device nvme,drive=sigma,serial=sigma -netdev user,id=nt0 -device virtio-net-pci,netdev=nt0".split(" ")
                });
                proc.run();
                break;
            case "desktop":
                win = new CatCore.Graphics.Window;
                win.fullScreen(true).headless(true);
                layer = new CatCore.Graphics.Layer;
                win.setUI(layer);
                text = new CatCore.Graphics.Text;
                text.content("ZulOS is the best fr fr!!");
                layer.add(text);
                win.open();
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