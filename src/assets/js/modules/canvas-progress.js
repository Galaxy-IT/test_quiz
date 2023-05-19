const canvasProgress = (id, callback) => {
  const canvas = document.getElementById(id);
  const context = canvas.getContext('2d');
  let posX = canvas.width / 2;
  let posY = canvas.height / 2;
  let fps = 1000 / 200;
  let percent = 0;
  let onePercent = 360 / 100;
  let radius = (canvas.width / 2) * 0.9;
  let result = onePercent * 100;

  context.lineCap = 'round';
  arcMove();

  function arcMove() {
    let deegres = 0;

    let acrInterval = setInterval(function () {
      deegres += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      percent = deegres / onePercent;
      context.beginPath();
      context.arc(posX, posY, radius, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
      context.strokeStyle = '#5FCAD366';
      context.lineWidth = '5';
      context.stroke();
      context.beginPath();
      context.strokeStyle = '#5fcad3';
      context.lineWidth = '5';
      context.arc(posX, posY, radius, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres));
      context.stroke();

      if (deegres >= result) {
        clearInterval(acrInterval);
        callback && callback(canvas);
      }
    }, fps);
  }
};

export { canvasProgress };
