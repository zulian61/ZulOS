// Loading animation to 100%
for (var i = 1; i <= 100; i++) {
    CatCore.loadProgress(i);
    await CatCore.delay(0.01 *CatCore.SECOND);
}

// Stop booting
CatCore.loadProgress();

var devices = CatCore.getDevices();
CatCore.backgroundColor("white");
CatCore.textColor("black");
CatCore.text(`CPU: ${devices.processors[0].model} ${devices.processors[0].speed.GHz} GHz (${devices.processors[0].cores})\nMemory: ${parseFloat((devices.memory.used.GB - devices.swap.used.GB).toFixed(1))} GB / ${devices.memory.capacity.GB} GB`);