import React from "react";
import axios from "axios";

class EditHabit extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeHname = this.onChangeHname.bind(this);
    this.onChangeImageURL = this.onChangeImageURL.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      hname: "",
      description: "",
      imageURL: "",
    };
  }
  componentDidMount() {
    console.log("insdie edit");
    axios.get("/api/habits/" + this.props.habitId).then((res) => {
      this.setState({
        hname: res.data.name,
        description: res.data.description,
        imageURL: res.data.imageURL,
      });
      console.log(res.data);
    });
  }

  onChangeHname(e) {
    this.setState({
      hname: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeImageURL(e) {
    this.setState({
      imageURL: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const habit = {
      description: this.state.description,
      hname: this.state.hname,
      imageURL: this.state.imageURL,
      token: localStorage.getItem("token"),
    };
    // console.log(habit);
    axios
      .post("/api/habits/update/" + this.props.habitId, habit)
      .then((res) => console.log(res.data));

    window.location = "/vision";
  }
  render() {
    return (
      <div className="habit">
        <form onSubmit={this.onSubmit}>
          <br />
          <br />
          <div className="form-group">
            <label>Habit Name:</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.state.hname}
              onChange={this.onChangeHname}
            />
          </div>

          <div className="form-group">
            <label>Affirmation:</label>
            <input
              type="text"
              className="form-control"
              defaultValue={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Image URL:</label>
            <input
              type="text"
              className="form-control"
              pattern="https://.*"
              placeholder="https://"
              defaultValue={this.state.imageURL}
              onChange={this.onChangeImageURL}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Habit"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default EditHabit;
