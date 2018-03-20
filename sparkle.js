class SparklePainter {

    constructor() {
        const pCount = 10;
        this.particles = [];
        this.currentValue = 0;
        // for(let i = 0; i < pCount; i++) {
        //     this.particles.push({
        //         x: 0,
        //         y: 0,
        //         a: 1,
        //         targetX: 0,
        //         targetY: 0
        //     })
        // }
    }

    static get inputProperties() { return ['--sparkle-pos', '--animation-tick']; }

    paint(ctx, geom, properties) {
        const sliderPosition = parseInt(properties.get('--sparkle-pos').toString());
        const tick = parseInt(properties.get('--animation-tick').toString());
        const { width, height } = geom;
        const wPos = width * sliderPosition / 100;

        if(this.currentValue !== sliderPosition) {
            for (let index = 0; index < 5; index++) {
                this.particles.push({
                    x: wPos,
                    y: height * Math.random() * 0.75
                });
            }
        }
        
        // draw
        this.particles.map( (p, i) => {
            const alpha = p.y / height;
            p.y -= 0.5;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
            ctx.rect(p.x, p.y, 1, 1);
            ctx.fill();
            return p;
        } );

        this.particles.filter( p => p.y > 0);
        
        this.currentValue = sliderPosition;

    }
}

// Register our class under a specific name
registerPaint('sparkle', SparklePainter);

  