<template>
  <div class="list-book-client flex-wrapper">
    <header class="header" style="background-color: #a6cafc">
      <div class="container">
        <div class="inner-head">
          <div class="inner-box">
            <router-link to="/">
              <div class="inner-logo">
                <img src="../../../assets/books.png" alt="Logo" />
                <span>BloomBook</span>
              </div>
            </router-link>
            <ul class="inner-menu">
              <router-link to="/">
                <li style="color: #0f1b4c">Home</li>
              </router-link>
              <router-link to="/books">
                <li style="color: #fff">Books</li>
              </router-link>
            </ul>
          </div>
          <form class="form-mini" @submit.prevent="search()">
            <div class="form-group d-flex mb-0">
              <input
                type="text"
                id="keyword"
                name="keyword"
                class="form-control"
                placeholder="Nhập từ khóa..."
                v-model="keyword"
              />
              <button type="submit" class="btn btn-primary btn-search">
                Tìm
              </button>
            </div>
          </form>
          <!-- <div v-if="myUser.userId">
            <div class="inner-info" @click="showUser()">
              <button
                v-if="myUser.avatar"
                class="title-name"
                style="padding: 0"
              >
                <img
                  v-bind:src="myUser.avatar"
                  v-bind:alt="myUser.fullName"
                  width="40px"
                  height="40px"
                  style="
                    object-fit: cover;
                    object-position: center;
                    border-radius: 50%;
                  "
                />
              </button>
              <button v-else class="title-name" :style="myStyle">
                {{ myUser.charName }}
              </button>
              <div class="box-info" :style="show">
                <div class="info" @click="myInfo()">
                  <i class="fa-regular fa-user"></i> Thông tin cá nhân
                </div>
                <div class="borrow" @click="borrowBook()">
                  <i class="fa-solid fa-book mr-2"></i> Sách đã mượn
                </div>
                <div class="log" @click="logout()">
                  <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </div>
              </div>
            </div>
          </div> -->
          <div class="acc" v-if="myUser.userId">
            <div
              class="acc-item text-center title-name"
              v-if="myUser.avatar"
              style="padding: 0"
              @click="myInfo()"
            >
              <img
                v-bind:src="myUser.avatar"
                v-bind:alt="myUser.fullName"
                width="40px"
                height="40px"
                style="
                  object-fit: cover;
                  object-position: center;
                  border-radius: 50%;
                "
              />
            </div>
            <div v-else class="acc-item text-center" @click="myInfo()">
              <i class="fa-regular fa-user mr-2" style="padding-left: 10px"></i>
            </div>
            <div class="acc-item text-center" @click="borrowBook()">
              <i class="fa-solid fa-book"></i>
            </div>
            <div class="acc-item text-center" @click="logout()">
              <i
                class="fa-solid fa-right-from-bracket mr-2"
                style="padding-left: 10px"
              ></i>
            </div>
          </div>
          <div v-else class="inner-auth">
            <router-link to="/auth/login">
              <div class="sign-in">Sign in</div>
            </router-link>
            <router-link to="/auth/register">
              <div class="sign-up">Sign up</div>
            </router-link>
          </div>
          <div class="inner-info">
            <div @click="showUser()" style="z-index: 999">
              <i
                class="fa-solid fa-bars bars"
                style="
                  display: none;
                  cursor: pointer;
                  font-size: 25px;
                  color: #fff;
                "
              ></i>
            </div>
            <div class="box-info" :style="show">
              <div v-if="myUser.userId">
                <div class="info">
                  <form
                    @submit.prevent="search()"
                    class="form-group d-flex mb-0"
                  >
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      class="form-control"
                      placeholder="Nhập từ khóa..."
                      v-model="keyword"
                    />
                    <button type="submit" class="btn btn-primary btn-search">
                      Tìm
                    </button>
                  </form>
                </div>
                <div class="info">
                  <router-link to="/books">
                    <i
                      class="fa-solid fa-book mr-2"
                      style="color: #5a6473; text-decoration: none !important"
                    ></i>
                    <span style="color: #5a6473">Sách</span>
                  </router-link>
                </div>
                <div class="info" @click="myInfo()">
                  <i class="fa-solid fa-user"></i> Thông tin cá nhân
                </div>
                <div class="borrow" @click="borrowBook()">
                  <i class="fa-solid fa-cart-shopping mr-2"></i> Sách đã mua
                </div>
                <div class="log" @click="logout()">
                  <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </div>
              </div>
              <div v-else>
                <router-link to="/books">
                  <div class="log">Books</div>
                </router-link>
                <hr />
                <router-link to="/auth/login">
                  <div class="log">Sign in</div>
                </router-link>
                <hr />
                <router-link to="/auth/register">
                  <div class="log">Sign up</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div style="padding-bottom: 25vh">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8">
            <h1 class="text-center mt-5">Đổi mật khẩu</h1>
            <form @submit.prevent="updatePassword()">
              <div class="form-group">
                <label for="password"
                  >Mật khẩu hiện tại <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  @blur="validate()"
                  v-model="password.password"
                  v-bind:class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
              <div class="form-group">
                <label for="newPassword"
                  >Mật khẩu mới <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  name="newPassword"
                  @blur="validate()"
                  v-model="password.newPassword"
                  v-bind:class="{ 'is-invalid': errors.newPassword }"
                />
                <div class="invalid-feedback" v-if="errors.newPassword">
                  {{ errors.newPassword }}
                </div>
              </div>
              <div class="form-group">
                <label for="rePassword"
                  >Nhập lại mật khẩu <span style="color: red">*</span>
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="rePassword"
                  name="rePassword"
                  @blur="validate()"
                  v-model="password.rePassword"
                  v-bind:class="{ 'is-invalid': errors.rePassword }"
                />
                <div class="invalid-feedback" v-if="errors.rePassword">
                  {{ errors.rePassword }}
                </div>
              </div>
              <div
                class="form-group d-grid gap-2 d-md-block"
                style="display: inline-block; margin-left: calc(50% - 80px)"
              >
                <button type="submit" class="btn btn-primary btn-lg">
                  Cập nhật
                </button>

                <div
                  class="invalid-feedback"
                  v-if="errors.message"
                  style="display: block"
                >
                  {{ errors.message }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright 2024 by VanB2103573</footer>
  </div>
</template>

<style scoped>
.flex-wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
}

.acc,
.login-acc {
  float: left;
  margin-right: 40px;
  display: flex;
  font-size: 20px;
  text-align: center;
}

.acc-btn {
  margin-left: 10px;
}

.acc-btn a {
  color: white;
  text-decoration: none;
}

.acc-item {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  text-align: center;
  margin-left: 10px;
}

.acc-item:hover {
  background-color: #d5f5f5;
  cursor: pointer;
}

.acc-item i {
  text-align: center;
  margin: auto;
  margin-top: 10px;
  color: black;
}
@media screen and (min-width: 805px) {
  .inner-info {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .inner-head .inner-menu li {
    position: relative;
    left: -220%;
  }

  .inner-head .form-mini div.form-group {
    position: relative;
    left: -40%;
  }

  .inner-head .form-mini input.form-control {
    width: 120px;
  }

  .inner-head .acc {
    position: relative;
    right: 10%;
  }
}
@media screen and (max-width: 800px) {
  .header .inner-menu {
    display: none;
  }
  .header form {
    display: none;
  }
  .header .acc {
    display: none;
  }
  .header .inner-auth {
    display: none;
  }
  .header .bars {
    display: inline-block !important;
  }
  .section-one .inner-image img {
    width: 90%;
    height: auto;
    margin-left: 30px;
  }
}

.inner-head .inner-info .box-info {
  padding: 10px 10px 10px 10px;
  width: 200px;
  position: absolute;
  left: calc(-580% - 32px);
  top: calc(100% + 20px);
  background-color: #eee;
}
</style>

<script>
export default {
  name: "InfoUser",
  data() {
    return {
      myStyle: {
        backgroundColor: "",
      },
      show: {
        display: "none",
      },
      errors: {
        password: "",
        newPassword: "",
        rePassword: "",
        message: "",
      },
      myUser: {
        userId: "",
        fullName: "",
        avatar: "",
        birthYear: "",
        sex: "",
        address: "",
        phone: "",
        password: "",
        charName: "",
        bgc: "",
      },
      password: {
        password: "",
        newPassword: "",
        rePassword: "",
      },
      keyword: "",
    };
  },
  created() {
    const tokenUser = this.$cookies.get("tokenUser");
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    if (tokenUser) {
      this.getMyUser(tokenUser);
      this.myStyle.backgroundColor = "#" + randomColor;
    }
  },
  methods: {
    validate() {
      let isValid = true;
      this.errors = {
        password: "",
        newPassword: "",
        rePassword: "",
        message: "",
      };
      if (!this.password.password) {
        this.errors.password = "Password is required";
        isValid = false;
        return;
      }
      if (!this.password.newPassword) {
        this.errors.newPassword = "New password is required";
        isValid = false;
        return;
      }
      if (!this.password.rePassword) {
        this.errors.rePassword = "New password is required";
        isValid = false;
        return;
      } else {
        let regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(this.password.rePassword)) {
          this.errors.rePassword =
            "New password is required minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
          isValid = false;
          return;
        }
      }
      if (this.password.newPassword !== this.password.rePassword) {
        this.errors.rePassword = "Confirm password incorrect";
        isValid = false;
        return;
      }

      return isValid;
    },
    updatePassword() {
      if (this.validate()) {
        const tokenUser = this.$route.params.token;
        if (tokenUser) {
          this.$request
            .patch(
              `http://localhost:5268/api/my-user/change-password/${tokenUser}`,
              this.password
            )
            .then((res) => {
              if (res.data.success) {
                this.$swal.fire("Đổi mật khẩu thành công!", "", "success");
                this.$router.push({ name: "user.info" });
              } else {
                this.errors.message = res.data.message;
              }
            });
        }
      }
    },
    search() {
      if (this.keyword) {
        this.$router.push({
          name: "books.result.search",
          query: { keyword: this.keyword },
        });
      }
    },
    async openUploadWidget() {
      const widget = await window.cloudinary.createUploadWidget(
        {
          cloud_name: "dyic01hpo",
          upload_preset: "upload-image-book",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            this.errors.avatar = "";
            this.myUser.avatar = result.info.secure_url;
          }
        }
      );
      widget.open();
    },
    getMyUser(tokenUser) {
      this.$request
        .get(`http://localhost:5268/api/my-user/${tokenUser}`)
        .then((res) => {
          if (res.data.success) {
            this.myUser = res.data.user;
            const arrName = res.data.user.fullName.split(" ");
            const name = arrName[arrName.length - 1];

            this.myUser.charName = name[0].toUpperCase();
          }
        });
    },
    showUser() {
      if (this.show.display === "none") {
        this.show.display = "block";
      } else {
        this.show.display = "none";
      }
    },
    myInfo() {
      this.$router.push({ name: "user.info" });
    },
    borrowBook() {
      this.$router.push({ name: "books.order" });
    },
    logout() {
      this.$cookies.remove("tokenUser");
      this.$router.push({ name: "user.login" });
    },
  },
};
</script>
