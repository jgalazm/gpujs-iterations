let render, texture;
const init =  () =>{
    const size = 512;
    const gpu = new GPU();
    const initialKernel = gpu.createKernel(function(size){
        return Math.pow(this.thread.x*this.thread.y/size/size,0.3);
    }, {
        output: [size,size],
        pipeline: true
    })
    

    render = gpu.createKernel(function(input) {
        this.color(input[this.thread.y][this.thread.x], 0, 0, 1);
    })
    .setOutput([size, size])
    .setGraphical(true);


    const compute = gpu.createKernel(function(input, size) {
        const val = input[(this.thread.y+1)%size][(this.thread.x+1)%size];
        return val;
    }, {
        output: [size, size],
        pipeline: true,
        immutable: true
    });


    
    texture = initialKernel(size);
    render(texture);

    const animate = ()=>{
        texture = compute(texture, size);
        render(texture);
        requestAnimationFrame(animate)
    };
    document.body.appendChild(render.canvas);
    animate();

}