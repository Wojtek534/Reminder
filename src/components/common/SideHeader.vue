<template>
  <div class="wrapper">
    <!-- Sidebar Holder -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>Reminder</h3>
      </div>
      <ul class="list-unstyled components">
        <div v-for="(item, index) in Header" :key="index">
          <div v-if="item.SubItems === undefined">
            <side-header-item :Name="item.Label" :Link="item.Link" />
          </div>
          <div v-if="item.SubItems !== undefined">
            <li>
              <a :href="'#'+item.Label" data-toggle="collapse" aria-expanded="false">{{item.Label}}</a>
              <ul class="collapse list-unstyled" :id="item.Label">
                <side-header-item v-for="(subItem, index) in item.SubItems" :key="index" :Name="subItem.Label" :Link="subItem.Link" />
              </ul>
            </li>
          </div>
        </div>
      </ul>
    </nav>
  </div>

</template>
<script>
import SideHeaderItem from "./SideHeaderItem";

export default {
  data() {
    return {
      Header: [
        {
          Label: "Head1",
          Link: "/"
        },
        {
          Label: "Head1",
          Link: "/",
          SubItems: [
            {
              Label: "Sub1",
              Link: "/"
            },
            {
              Label: "Sub2",
              Link: "/"
            },
            {
              Label: "Sub3",
              Link: "/"
            }
          ]
        },
        {
          Label: "Head2",
          Link: "/",
          SubItems: [
            {
              Label: "Sub1",
              Link: "/"
            },
            {
              Label: "Sub2",
              Link: "/"
            },
            {
              Label: "Sub3",
              Link: "/"
            }
          ]
        }
      ]
    };
  },
  components: {
    sideHeaderItem: SideHeaderItem
  }
};
</script>
<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300";

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 40px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */
#sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: #7386d5;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  margin-left: -250px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #6d7fcc;
}

#sidebar ul.components {
  padding: 20px 0;
  border-bottom: 1px solid #47748b;
}

#sidebar ul p {
  color: #fff;
  padding: 10px;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
#sidebar ul li a:hover {
  color: #7386d5;
  background: #fff;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #6d7fcc;
}

a[data-toggle="collapse"] {
  position: relative;
}

a[aria-expanded="false"]::before,
a[aria-expanded="true"]::before {
  content: "\f055";
  display: block;
  position: absolute;
  right: 20px;
  font-family: "FontAwesome";
  font-size: 0.6em;
}
a[aria-expanded="true"]::before {
  content: "\f056";
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #6d7fcc;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}
a.download {
  background: #fff;
  color: #7386d5;
}
a.article,
a.article:hover {
  background: #6d7fcc !important;
  color: #fff !important;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }
  #sidebar.active {
    margin-left: 0;
  }
  #content {
    width: 100%;
  }
  #content.active {
    width: calc(100% - 250px);
  }
  #sidebarCollapse span {
    display: none;
  }
}
</style>

