class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    const startDrag = (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      
      if(e.type.startsWith('touch')) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
      } else {
        this.startX = e.clientX;
        this.startY = e.clientY;
      }
    };

    const onDrag = (e) => {
      if(!this.holdingPaper) return;

      let x, y;
      if(e.type.startsWith('touch')) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      this.velX = x - this.startX;
      this.velY = y - this.startY;
      this.currentX += this.velX;
      this.currentY += this.velY;

      paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;

      this.startX = x;
      this.startY = y;
    };

    const endDrag = () => {
      this.holdingPaper = false;
    };

    paper.addEventListener('mousedown', startDrag);
    paper.addEventListener('touchstart', startDrag);

    paper.addEventListener('mousemove', onDrag);
    paper.addEventListener('touchmove', onDrag);

    paper.addEventListener('mouseup', endDrag);
    paper.addEventListener('touchend', endDrag);
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => new Paper().init(paper));
