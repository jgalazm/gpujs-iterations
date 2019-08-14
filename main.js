let render, texture;
const init =  () =>{
    const size = 512;
    const gpu = new GPU();
    const initialKernel = gpu.createKernel(function(size){
        return this.thread.x/size;
    }, {
        output: [size,size],
        pipeline: true
    })
    

    render = gpu.createKernel(function(input) {
        this.color(input[this.thread.x][this.thread.y], 0, 0, 1);
    })
    .setOutput([size, size])
    .setGraphical(true);


    const compute = gpu.createKernel(function(input) {
        return input[this.thread.x][this.thread.y]/2.0;
    }, {
        output: [size, size],
        pipeline: true,
        immutable: true
    });


    
    texture = initialKernel(size);
    console.log('asfsdf', texture.toArray().flat()[1][10])
    render(texture);

    setInterval(()=>{
        texture = compute(texture);
        render(texture);
    }, 1000);
    document.body.appendChild(render.canvas);


}