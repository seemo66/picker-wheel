/**
 * PickerWheel - A vanilla JavaScript picker wheel component
 * No dependencies required - pure vanilla JS
 */

class PickerWheel {
    constructor(containerId, options = {}) {
        this.container = typeof containerId === 'string' 
            ? document.getElementById(containerId) 
            : containerId;
        
        if (!this.container) {
            throw new Error('Container element not found');
        }

        // Default options
        this.options = {
            items: options.items || [],
            radius: options.radius || 250,
            textOffset: options.textOffset || 0.7,
            lineWidth: options.lineWidth || 2,
            duration: options.duration || 4000,
            spinCount: options.spinCount || 8,
            onSpinStart: options.onSpinStart || null,
            onSpinEnd: options.onSpinEnd || null
        };

        this.isSpinning = false;
        this.currentRotation = 0;
        this.animationId = null;
        
        this.init();
    }

    init() {
        // Create wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'picker-wheel-wrapper';
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'picker-wheel-canvas';
        this.canvas.width = this.options.radius * 2;
        this.canvas.height = this.options.radius * 2;
        this.ctx = this.canvas.getContext('2d');
        
        // Create pointer
        this.pointer = document.createElement('div');
        this.pointer.className = 'picker-wheel-pointer';
        
        // Create center circle
        this.centerCircle = document.createElement('div');
        this.centerCircle.className = 'picker-wheel-center';
        this.centerCircle.textContent = 'SPIN';
        
        // Append elements
        this.wrapper.appendChild(this.pointer);
        this.wrapper.appendChild(this.canvas);
        this.wrapper.appendChild(this.centerCircle);
        this.container.appendChild(this.wrapper);
        
        // Draw initial wheel
        this.draw();
    }

    draw() {
        const items = this.options.items;
        const numItems = items.length;
        
        if (numItems === 0) return;
        
        const radius = this.options.radius;
        const centerX = radius;
        const centerY = radius;
        const anglePerItem = (Math.PI * 2) / numItems;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        
        // Translate to center and apply rotation
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.currentRotation);
        this.ctx.translate(-centerX, -centerY);
        
        // Draw each segment
        for (let i = 0; i < numItems; i++) {
            const item = items[i];
            const startAngle = i * anglePerItem;
            const endAngle = startAngle + anglePerItem;
            
            // Draw segment
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            
            this.ctx.fillStyle = item.color || this.getDefaultColor(i);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = this.options.lineWidth;
            this.ctx.stroke();
            
            // Draw text
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + anglePerItem / 2);
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillText(
                item.label, 
                radius * this.options.textOffset, 
                0
            );
            this.ctx.restore();
        }
        
        this.ctx.restore();
    }

    getDefaultColor(index) {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
        ];
        return colors[index % colors.length];
    }

    spin() {
        if (this.isSpinning || this.options.items.length === 0) {
            return;
        }
        
        this.isSpinning = true;
        
        // Callback: spin start
        if (this.options.onSpinStart) {
            this.options.onSpinStart();
        }
        
        // Calculate random final angle
        const numItems = this.options.items.length;
        const anglePerItem = (Math.PI * 2) / numItems;
        const randomIndex = Math.floor(Math.random() * numItems);
        
        // Calculate total rotation
        const spinRotations = this.options.spinCount * Math.PI * 2;
        const randomAngle = Math.random() * anglePerItem;
        const targetAngle = spinRotations + (randomIndex * anglePerItem) + randomAngle;
        
        // Animation
        const startTime = performance.now();
        const startRotation = this.currentRotation;
        const duration = this.options.duration;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + (targetAngle * easeOut);
            this.draw();
            
            if (progress < 1) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.animationId = null;
                this.onSpinComplete(randomIndex);
            }
        };
        
        this.animationId = requestAnimationFrame(animate);
    }

    onSpinComplete(winningIndex) {
        this.isSpinning = false;
        
        // Normalize rotation
        this.currentRotation = this.currentRotation % (Math.PI * 2);
        
        const result = this.options.items[winningIndex];
        
        // Callback: spin end
        if (this.options.onSpinEnd) {
            this.options.onSpinEnd(result);
        }
    }

    updateItems(items) {
        this.options.items = items;
        this.draw();
    }

    destroy() {
        // Cancel any running animation
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Remove from DOM
        if (this.container && this.wrapper) {
            this.container.removeChild(this.wrapper);
        }
    }
}

// Export for module usage (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PickerWheel;
}
