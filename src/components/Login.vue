<template>
  <form @submit.prevent="onSubmit">
    <div class="panel">
      <p class="panel-heading">Login</p>
      <p class="help is-danger" v-show="errors['message']" v-text="getErrors('message')"></p>
      <div class="panel-block">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="email" v-model="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </p>
          <p class="help is-danger" v-show="errors['email']" v-text="getErrors('email')"></p>
        </div>
      </div>

      <div class="panel-block">
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" v-model="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
          <p class="help is-danger" v-show="errors['password']" v-text="getErrors('password')"></p>
        </div>
      </div>

      <div class="panel-block login-btn">
        <div class="field">
          <p class="control has-icons-left">
            <button class="button is-info" type="submit">Login</button>
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import * as axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (this.email && this.password) {
        return true;
      }

      if (!this.email) {
        this.errors["email"] = "Email Field Required";
      }

      if (!this.password) {
        this.errors["password"] = "Password Field Required";
      }

      return false;
    },
    getErrors(field) {
      if (this.errors[field]) {
        return this.errors[field];
      }
    },
    onSubmit() {
      if (!this.validateForm()) {
        console.log(this.errors);
        return;
      }

      axios
        .post(
          "https://vibes-music.herokuapp.com/api/v1/user",
          { email: this.email, password: this.password }
        )
        .then(response => localStorage.setItem("api-token", response.data.api_token))
        .catch(error => (this.errors = error.response.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  width: 380px;
  margin: 0 auto;

  .panel-block {
    border-bottom: none;

    .field {
      margin: 0 auto;
      width: 100%;
    }
  }

  .login-btn {
    border-bottom: 1px solid #dbdbdb;
  }
}
</style>
