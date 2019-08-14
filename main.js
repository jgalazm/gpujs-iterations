const init =  () =>{
    
    const gpu = new GPU();
    debugger;
    const render = gpu.createKernel(function() {
        this.color(1, 0, 0, 1);
    })
    .setOutput([512, 512])
    .setGraphical(true);
    
    render();
    
    document.body.appendChild(render.canvas);

}