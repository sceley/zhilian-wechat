module.exports = {
  getMonth: function (option) {
    const date = new Date(option);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month >= 10 ? month : `0${month}`;
    day = day >= 10 ? day : `0${day}`;
    return `${month}-${day}`;
  }
};