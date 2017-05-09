/**
 * Created by EimantasPauzuolis on 05/05/2017.
 */
new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        playerDamaged : false,
        monsterDamaged: false,
        specialDamage: false,
        healing: false,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame: function () {
            this.gameIsRunning = true;

        },

        attack: function () {
            //damage for the monster
            var maxDamage = 10;
            var minDamage = 3;

            var damage = this.calculateDamage(minDamage, maxDamage);
            this.monsterDamaged = true;
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hit Monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }
            var vm = this;
            setTimeout(function(){
                vm.monsterDamaged = false;
            },500);

            this.monsterAttack();

        },

        specialAttack: function () {
            var specialMinDamage = 10;
            var specialMaxDamage = 20;

            if(this.checkWin()){
                return;
            }

            this.specialDamage = true;
            var damage = this.calculateDamage(specialMinDamage, specialMaxDamage);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player used a special attack and hit the Monster for ' + damage
            });
            var vm = this;
            setTimeout(function(){
                vm.specialDamage = false;
            },500);


            this.monsterAttack()
        },

        heal: function () {
            var healValue = 10;
            this.healing = true;
            if(this.playerHealth <=90){
                this.playerHealth += healValue;
            }else{
                this.playerHealth = 100;
            }
            var vm = this;
            setTimeout(function () {
                vm.healing = false;
            },2000);
            this.turns.unshift({
                isPlayer: true,
                text: 'Player has healed ' + healValue
            });
            this.monsterAttack();
        },

        endGame: function () {
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
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
            if(this.checkWin()){
                return;
            }
            else {
                var vm = this;

                setTimeout(function () {
                    vm.playerDamaged = true;
                    var damage = vm.calculateDamage(minDamage, maxDamage);
                    vm.playerHealth -= damage;
                    vm.turns.unshift({
                        isPlayer: false,
                        text: 'Monster hit the player for ' + damage
                    });
                    vm.checkWin();
                }, 700);
                vm.playerDamaged = false;
            }
        }
    }
});