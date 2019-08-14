const init =  () =>{
    const size = 512;
    const gpu = new GPU();
    const initialKernel = gpu.createKernel(function(){
        return this.thread.x/512;
    })
    .setOutput([size,size]);

    const render = gpu.createKernel(function(input) {
        this.color(input[this.thread.x][this.thread.y], 0, 0, 1);
    })
    .setOutput([512, 512])
    .setGraphical(true);
    
    let texture = initialKernel();
    render(texture);
    
    document.body.appendChild(render.canvas);

}