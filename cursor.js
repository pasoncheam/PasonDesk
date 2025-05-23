class ElectricCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'electric-cursor';
        document.body.appendChild(this.cursor);

        this.particles = [];
        this.maxParticles = 15; // Increased number of particles
        this.particleLifetime = 400; // Faster particle lifetime
        this.lastX = 0;
        this.lastY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e);
            
            // Calculate movement speed
            const speed = Math.sqrt(
                Math.pow(e.clientX - this.lastX, 2) + 
                Math.pow(e.clientY - this.lastY, 2)
            );
            
            // Create more particles when moving faster
            const particleCount = Math.min(Math.floor(speed / 5), 3);
            for (let i = 0; i < particleCount; i++) {
                this.createParticle(e.clientX, e.clientY);
            }
            
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.display = 'block';
        });
    }

    moveCursor(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
    }

    createParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            const oldParticle = this.particles.shift();
            oldParticle.element.remove();
        }

        const particle = document.createElement('div');
        particle.className = 'electric-particle';
        
        // Add random offset to particle position
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        
        // Randomize particle size
        const size = 4 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        document.body.appendChild(particle);

        const particleObj = {
            element: particle,
            createdAt: Date.now()
        };

        this.particles.push(particleObj);

        setTimeout(() => {
            const index = this.particles.indexOf(particleObj);
            if (index > -1) {
                this.particles.splice(index, 1);
                particle.remove();
            }
        }, this.particleLifetime);
    }
}

// Initialize the electric cursor when the page loads
window.addEventListener('load', () => {
    new ElectricCursor();
}); 