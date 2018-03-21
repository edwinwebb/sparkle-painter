class SparklePainter {

    constructor() {
        this.particles = [];
        this.currentValue = 0;
    }

    static get inputProperties() { return ['--sparkle-pos', '--animation-tick', '--sparkle-color']; }

    paint(ctx, geom, properties) {
        const sliderPosition = parseInt(properties.get('--sparkle-pos').toString());
        const tick = parseInt(properties.get('--animation-tick').toString());
        const sColor = properties.get('--sparkle-color').toString();
        const { width, height } = geom;
        const wPos = width * sliderPosition / 100;

        if(this.currentValue !== sliderPosition) {
            for (let index = 0; index < 5; index++) {
                this.particles.push({
                    x: wPos + (Math.random() * 10) - 5,
                    y: height * Math.random() * 0.75
                });
            }
        }

        // draw
        this.particles.map( (p, i) => {
            const alpha = p.y / height;
            p.y -= 0.5;
            ctx.beginPath();
            ctx.fillStyle = sColor.replace(')', ','+alpha+')');
            ctx.rect(p.x, p.y, 2, 2);
            ctx.fill();
            return p;
        } );

        this.particles = this.particles.filter( p => p.y > 0);

        this.currentValue = sliderPosition;

    }
}

registerPaint('sparkle', SparklePainter);

  