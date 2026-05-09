class Component {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;

        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
        this.element.style.backgroundColor = this.color;
        
        const container = document.getElementById('game-container');
        if (container) {
            container.appendChild(this.element);
        }
        
        this.updateVisual();
    }

    updateVisual() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    setX(_x) {
        this.x = _x;
        this.updateVisual();
    }
}