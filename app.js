new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[],
    },
    methods:{
        startGame: function(){

             this.gameIsRunning=true;
             this.monsterHealth=100;
             this.playerHealth=100;  
             this.turns=[]; 
        },
        attack: function()
        {
            this.playerAttacksMonster();
            if(this.checkWin())
            {
                return;
            }
           this.monsterAttacksPlayer();
            this.checkWin();
        },

        monsterAttacksPlayer()
        {
            damage = this.calculateDamage(5,10); 
            this.playerHealth-= damage;
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits player by ' +damage
            })
        },
        playerAttacksMonster()
        {
            var damage = this.calculateDamage(3,10);
            this.monsterHealth-=damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits monster by ' + damage
            })
        },
        calculateDamage(min,max){
            return Math.max(Math.floor(Math.random() * max ) + 1, min);
        },
        checkWin(){
            if(this.monsterHealth<=0)
            {
                alert('You won!');
                this.gameIsRunning=false;
                this.monsterHealth=0;
                return true;
            }
            else if(this.playerHealth<=0)
            {
                alert('You lost!');
                this.gameIsRunning=false;
                this.playerHealth=0;
                return true;
            }
            return false;
        },
        specialAttack: function(){
            var damage = this.calculateDamage(6,10);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits monster by ' +damage
            })
            if(this.checkWin())
            {
                return;
            }
           this.monsterAttacksPlayer();
            this.checkWin();
        },
        heal(){
            if(this.playerHealth<90)
            {
                this.playerHealth+=10;
            }
            var damage = this.calculateDamage(3,10);
            this.monsterHealth-= damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits monster by ' + damage + ' and heals by 10'
            })
            if(this.checkWin())
            {
                return;
            }
           this.monsterAttacksPlayer();
            this.checkWin();
            
        },
        giveUp(){
            var status = confirm("The game will end?")
            {
                if(status==true)
                {
                    this.gameIsRunning=false;
                }
            }

        },
    }
});