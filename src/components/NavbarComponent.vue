<template>
    <div class="Navbar">
        <svg class="navbar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0099ff" fill-opacity="1" d="M0,96L40,101.3C80,107,160,117,240,112C320,107,400,85,480,90.7C560,96,640,128,720,144C800,160,880,160,960,138.7C1040,117,1120,75,1200,101.3C1280,128,1360,224,1400,272L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
        <div class="navbar-title">
            <span>
                Address Book
            </span>
        </div>
        <div class="navbar-download">
            <v-btn color="white" @click="install">
                Download
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavbarComponent',
    data() {
        return {
        deferredPrompt: null
        };
    },
    created() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
    },
    methods: {
        async install() {
            this.deferredPrompt.prompt();
        },
  },
}
</script>

<style lang="scss" scoped>
.Navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5rem 1rem 5rem;
    @media screen and (max-width: 1150px){
        padding: 1rem 2rem 1rem 2rem;
        background-color: #0099ff;
    }
    .navbar-svg {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        @media screen and (max-width: 1050px){
            top: 30px;
        }
        @media screen and (max-width: 600px){
            top: 50px;
        }
    }
    .navbar-title {
        font-size: 2.5rem;
        color: white;
        @media screen and (max-width: 1150px){
            font-size: 1.5rem;
        }
    }
    .navbar-download {
        button {
            font-weight: 700;
        }
    }
}
</style>