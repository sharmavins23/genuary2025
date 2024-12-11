
class Gen08 {
    constructor() {
        this.canvas = document.getElementById("canvas08");
        this.ctx = this.canvas.getContext("2d");

        this.isPlaying = true;

        this.fps = 20;
        this.frameCount = 0;

        this.xPos = 100;
        this.yPos = 100;

        // Reset the canvas
        this.resetCanvas();
        // Start up the draw loop
        const drawLoop = () => {
            if (!this.isPlaying) return;

            this.drawFrame();
            this.frameCount += 1;

            setTimeout(drawLoop, 1000 / this.fps);
        };
        setTimeout(drawLoop, 1000 / this.fps);
    }

    drawFrame() {
        // Clear the canvas
        this.resetCanvas();

        let textSize = 30;
        if (Math.random() < 0.01) {
            textSize = 50;
        }

        // Draw glitchy text
        this.ctx.font = `${textSize}px courier new`;
        this.ctx.fillStyle = "white";
        let text = "ERROR: NOT FOUND";
        let textWidth = this.ctx.measureText(text).width;
        let textHeight = 200; // Height is centered by default which is weird
        // Calculate the offset to center the text
        this.xPos = (this.canvas.width - textWidth) / 2;

        // Rarely, shift the xPos to create a glitch effect
        if (Math.random() < 0.01) {
            this.xPos += Math.random() * 10;
        }
        if (Math.random() < 0.01) {
            this.yPos += Math.random() * 10;
        }

        this.ctx.fillText("ERROR: NOT FOUND", this.xPos, textHeight);

        // Very rarely, add a copy behind the text with R, G, or B channel on
        if (Math.random() < 0.05) {
            let channel = Math.floor(Math.random() * 3);
            let colors = ["red", "green", "blue"];
            this.ctx.fillStyle = colors[channel];
            this.ctx.fillText("ERROR: NOT FOUND", this.xPos + 1, textHeight);
        }

        // Create glitch effect
        for (let i = 0; i < 10; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            let spliceWidth = this.canvas.width * (Math.random() * 0.1);
            let spliceHeight = 1 + Math.random() * 10;
            this.ctx.drawImage(
                this.canvas,
                x,
                y,
                spliceWidth,
                spliceHeight,
                x + Math.random() * 10,
                y + Math.random() * 5,
                spliceWidth,
                spliceHeight
            );
        }

        // Underneath, EXTREMELY RARELY, write a hidden message
        if (Math.random() < 0.01) {
            this.drawCenteredText(
                "System failure - Terminate immediately",
                230,
                15
            );
        }
        if (Math.random() < 0.001) {
            this.drawCenteredText("YOU ARE BEING WATCHED", 250, 15);
        }
    }

    // ===== Helper functions ==================================================

    resetCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCenteredText(text, y, size, color = "white", font = "courier new") {
        this.ctx.font = `${size}px ${font}`;
        let textWidth = this.ctx.measureText(text).width;
        let xPos = (this.canvas.width - textWidth) / 2;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, xPos, y);
    }
}

// Start the generator
new Gen08();