/**
 * Created by EimantasPauzuolis on 05/05/2017.
 */
new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods:{
        startGame: function () {
            this.gameIsRunning = true;
        },

        attack: function () {
            //damage for the monster
            var maxDamage = 10;
            var minDamage = 3;

            if(this.checkWin()){
                return;
            }
            this.monsterHealth -= this.calculateDamage(minDamage, maxDamage);

            this.monsterAttack();

        },

        specialAttack: function () {
            var specialMinDamage = 10;
            var specialMaxDamage = 20;
            this.monsterHealth -= this.calculateDamage(specialMinDamage, specialMaxDamage);
            if(this.checkWin()){
                return;
            }
            this.monsterAttack()
        },

        heal: function () {
            var healValue = 10;
            if(this.playerHealth <=90){
                this.playerHealth += healValue;
            }else{
                this.playerHealth = 100;
            }

            this.monsterAttack();
        },

        endGame: function () {
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        calculateDamage: function (minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkWin: function () {
            if(this.monsterHealth <=0){
                if(confirm('You have won. Start a new game?')){
                    this.endGame();
                    this.startGame();
                }else{
                    this.endGame();
                }
                return true;

            }else if(this.playerHealth <=0){
                if(confirm('You have lost. Start a new game?')){
                    this.endGame();
                    this.startGame()
                }else{
                    this.endGame();
                }
                return true;
            }
            return false;
        },
        monsterAttack: function () {
            //damage for the player
            maxDamage = 12;
            minDamage = 5;
            var vm = this;
            setTimeout(function () {
                vm.playerHealth -= vm.calculateDamage(minDamage, maxDamage);
                vm.checkWin();
            }, 300);
        }
    }
});