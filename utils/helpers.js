module.exports = {
  format_date: () => {
    return `${new Date().getMonth() + 1}/${new Date().getDate()}/${
      new Date().getFullYear()
    }`;
  },
};