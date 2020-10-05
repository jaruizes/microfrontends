import { Component, h, Prop, State } from '@stencil/core';
import { bottom } from '@popperjs/core';

@Component({
  tag: 'contact-form',
  styleUrls: ['contact-form.css', './assets/css/fontawesome/css/fontawesome.css'],
  shadow: true,
  assetsDirs: ['assets']
})
export class ContactForm {

  @Prop() title: string;

  @State() formControls = {
    name: null,
    email: null,
    message: null
  };

  handleChange(controlName, value) {
    this.formControls = {
      ...this.formControls,
      [controlName]: value
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(this.formControls);
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div class="container">
          <div class="row">
            <div class="col-md-8 mr-auto ml-auto">
              <div style={{"margin-bottom": "1em"}}>
                <h2 class="text-center">Keep in touch? </h2>
              </div>
              <div class="row form-row">
                <div class="col-md-6">
                  <label>Name</label>
                  <div class="input-group">
                      <input type="text" class="form-control" placeholder="Name" onInput={(ev: any) => this.handleChange("name", ev.target.value)}></input>
                  </div>
                </div>
                <div class="col-md-6">
                    <label>Email</label>
                    <div class="input-group">
                        <input type="email" class="form-control" placeholder="Email" onInput={(ev: any) => this.handleChange("email", ev.target.value)}></input>
                    </div>
                </div>
              </div>
              <div class="row form-row">
                <div class="col-12">
                  <label>Message</label>
                  <div>
                    <textarea class="form-control" placeholder="Tell us your thoughts and feelings..." onInput={(ev: any) => this.handleChange("message", ev.target.value)}></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4 mr-auto ml-auto">
                    <button class="btn btn-danger btn-lg btn-fill">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

}
