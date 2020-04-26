<template>
  <div class="container marginTop">
    <b-row class="d-flex justify-content-center responsive">
      <b-col class="col-5 md=5">
        <b-card class="shadow">    
            <div class="text-center">
              <h3 class="dark-grey-text mb-2">
                <strong>Sign in</strong>
              </h3>
            </div>
          <b-card-body>
            <b-form>
              <b-input-group class="mb-4 mt-3">
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="username" type="text" required placeholder="Your username"></b-form-input>
              </b-input-group>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input v-model="password" type="password" required placeholder="Your password"></b-form-input>
              </b-input-group>
              <b-button type="button" class="mt-4 mb-1 col-12">Sign in</b-button>
            </b-form>
          </b-card-body>
          <hr class="col-10">
            <p class="font-small grey-text d-flex justify-content-end mr-4">
              Not a member?
              <a href="/registration" class="ml-1">Sign up</a>
            </p>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    }    
  }
};
</script>

<style scoped>

.marginTop {
    margin-top: 10%;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
    box-shadow: 5px 5px 5px 5px;
}
</style>