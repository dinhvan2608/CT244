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
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="box-head">
              <h1 class="inner-title text-center mt-5">Sách đã mua</h1>
            </div>
          </div>
        </div>
        <div class="container book-order">
          <div class="row">
            <div
              v-for="order in orders"
              class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3"
            >
              <div class="col">
                <div
                  class="item product-item"
                  @click="sendDetail(order.book.slug, order.order.quantity)"
                >
                  <img
                    v-bind:src="order.book.thumbnail"
                    v-bind:alt="order.book.bookName"
                  />
                  <div class="content">
                    <h5>{{ order.book.bookName }}</h5>
                    <div class="inner-quantity mb-2">
                      Số lượng đã mượn: <span>{{ order.order.quantity }}</span>
                    </div>
                    <div
                      v-if="order.order.createdAt === order.order.updatedAt"
                      class="inner-create mb-2"
                    >
                      Ngày mua:
                      <b>{{ formatDate(order.order.createdAt) }}</b>
                    </div>
                    <div v-else class="inner-update mb-2">
                      Ngày mua:
                      <b>{{ formatDate(order.order.updatedAt) }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">Copyright 2024 by Nhom39</footer>
  </div>
</template>

<style scoped>
/* box-head */
.box-head {
  margin-bottom: 30px;
}

.box-head .inner-title {
  margin-bottom: 2px;
  font-size: 28px;
  font-weight: 600;
  color: #0f1b4c;
  position: relative;
}

.box-head .inner-title::after {
  content: "";
  display: inline-block;
  width: 100px;
  height: 3px;
  background-color: #0f1b4c;
  position: absolute;
  top: calc(100% + 2px);
  left: calc(50% - 50px);
}

.border-b {
  padding-top: 30px;
  border-top: 1px solid #ddd;
}
/* End box-head */

/* .book-order .box-book {
  border: 1px solid #ccc;
  border-radius: 12px;
}

.book-order .inner-image {
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
}

.book-order .inner-image img {
  height: 250px;
  object-fit: contain;
}



.box-book:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
} */
.book-order .inner-quantity span {
  color: #fff;
  background: green;
  font-weight: 600;
  display: inline-block;
  padding: 3px 6px;
  border-radius: 8px;
}
.top {
  background-color: #d5f5f5;
  height: 80vh;
}

.product_navbar {
  background-color: #a6cafc;
}

.navbar-name {
  color: #1b55d1 !important;
  font-size: 40px;
}

/* footer
.footer {
    background-color: #1b242f;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: end;
} */

.foot_item {
  height: 5vh;
  background-color: #384152;
  width: 95vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 0;
  color: #6a7580;
}

.foot_item svg,
i {
  margin-left: 8px;
}

/* Product */
.item {
  border-radius: 5px;
  width: 250px;
  height: 450px;
  background-color: rgb(255, 255, 255);
  overflow: hidden;
  transition: transform 0.2s ease;
  /* border: 1px solid #ddd; */
}

.item img {
  display: block;
  margin: 10px auto 0px;
  max-width: 250px;
  max-height: 310px;
  object-fit: cover;
  border-radius: 5px;
}

.item .content {
  margin-top: 12px;
  margin-left: 10px;
}

.item .content h5 {
  font-size: 17px;
  /* font-weight: bold; */
  margin: 0px;
}

.item .content p {
  color: #838383;
}
.item:hover {
  transform: translate(-7px, -7px);
}
/* 
.h1-title {
    margin-top: 30px;
    margin-bottom: 50px;
} */

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
  left: calc(-400% - 32px);
  top: calc(100% + 20px);
  background-color: #eee;
}
</style>

<script>
import moment from "moment";
export default {
  name: "OrderBook",
  data() {
    return {
      myStyle: {
        backgroundColor: "",
      },
      show: {
        display: "none",
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
      myOrder: {
        giveQuantity: "",
      },
      orders: [],
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
    giveOrder(userId, bookId) {
      this.$request
        .patch("http://localhost:5268/api/order/give", {
          userId: userId,
          bookId: bookId,
          giveQuantity: this.myOrder.giveQuantity,
        })
        .then((res) => {
          this.getAll(res.data.userId);
          console.log(res.data);
        });
    },
    getAll(userId) {
      this.$request
        .get(`http://localhost:5268/api/order/${userId}`)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
          }
        });
    },
    sendDetail(slugBook, quantity) {
      quantity = quantity + "";
      this.$router.push({
        name: "books.order.detail",
        params: { slugBook: slugBook, quantity: quantity },
      });
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("h:mm A, DD/MM/YYYY");
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
    getMyUser(tokenUser) {
      this.$request
        .get(`http://localhost:5268/api/my-user/${tokenUser}`)
        .then((res) => {
          if (res.data.success) {
            this.myUser = res.data.user;
            const arrName = res.data.user.fullName.split(" ");
            const name = arrName[arrName.length - 1];

            this.myUser.charName = name[0].toUpperCase();
            this.getAll(this.myUser.userId);
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
