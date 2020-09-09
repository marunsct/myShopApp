import moment from "moment";

class orders {
  constructor(key, orderValue, date, orderItems) {
    this.key = key;
    this.orderValue = orderValue;
    this.date = date;
    this.orderItems = orderItems;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default orders;
