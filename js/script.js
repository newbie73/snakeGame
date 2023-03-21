const game_zone = document.getElementById("game-zone")
const ctx = game_zone.getContext('2d')

game_zone.width = "200"
game_zone.height = "200"

const snake = {
    color: "black",
}

const apple = {
    color: "red",
    pluses: false,
    minuses: "speed: 0.5",
}

function letsPlay(canvas, context, fruit, snake){
    function calcEntitiesSize(){
        return [canvas.width / 10,canvas.height / 10]
    }
    function returnRandPos(size_arr){
        let rand_pos_x = Math.floor(Math.random() * (size_arr[0] - (size_arr[0] / 10)))
        let rand_pos_y = Math.floor(Math.random() * (size_arr[1] - (size_arr[1] / 10)))
    
        rand_pos_x % 2 === 0 ? rand_pos_x*= 10 : rand_pos_x = (rand_pos_x - 1) * 10
        rand_pos_y % 2 === 0 ? rand_pos_y*= 10 : rand_pos_y = (rand_pos_y - 1) * 10
    
        return [rand_pos_x, rand_pos_y]
    }
    function getPixelInfo(x,y,width,height){
        const pixel_info = context.getImageData(x,y,width,height)
        
        const r = pixel_info.data[0]
        const g = pixel_info.data[1]
        const b = pixel_info.data[2]

        console.log(r,g,b)

    }
    function setFruitPos(){
        const fruit_size_arr = calcEntitiesSize()
        const fruit_pos_arr = returnRandPos(fruit_size_arr)
        const pix_color = getPixelInfo(fruit_pos_arr[0],fruit_pos_arr[1], 1, 1)
        
        context.fillStyle = fruit.color
        context.fillRect(...fruit_pos_arr, 10, 10)

        return fruit_pos_arr
    }
    function changePos(prop_arr){
        context.fillRect(...prop_arr)
    }

    function snakeEngine(){
        let setted_fruit_pos = setFruitPos()
        let prop = [0,0, 10, 10]
        let len = 6
        let course = "-x"

        context.fillStyle = snake.color

        function moveTo(){
            if(course === "x"){
                prop[0] -= 10
                changePos(prop)
                return [prop[0], prop[1], prop[2], prop[3]] // due to some problem, i can't return the whole prop
            }else if(course === "-x"){
                prop[0] += 10
                changePos(prop)
                return [prop[0], prop[1], prop[2], prop[3]]
            }else if(course === "y"){
                prop[1] -= 10
                changePos(prop)
                return [prop[0], prop[1], prop[2], prop[3]]
            }else if(course === "-y"){
                prop[1] += 10
                changePos(prop)
                return [prop[0], prop[1], prop[2], prop[3]]
            }
        }
        function clearAll(prop_arr){
            context.clearRect(...prop_arr);
        }

        function detectFruitEating(snake_pos, apple_pos){
            if(snake_pos[0] === apple_pos[0] && snake_pos[1] === apple_pos[1]){
                len += 2
                setted_fruit_pos = setFruitPos()
                context.fillStyle = snake.color

            }
        }
        function checkBorders(snake_pos, border){
            if(snake_pos[0] > border.width || snake_pos[1] > border.height || snake_pos[0] < 0 || snake_pos[1] < 0){
                return gameLose()
            }
        }
        function changeCourse(){
            document.addEventListener("keydown", (e) => {
                if(e.key === "ArrowUp" && course !== "-y"){
                    course = "y"
                }else if(e.key === "ArrowDown" && course !== "y"){
                    course = "-y"
                }else if(e.key === "ArrowLeft" && course !== "-x"){
                    course = "x"
                }else if(e.key === "ArrowRight" &&course !== "x"){
                    course = "-x"
                }
            })
        }
        changeCourse()

        setInterval(() => {
            const moved_prop = moveTo()
            detectFruitEating(moved_prop, setted_fruit_pos, len)
            const check_bord = checkBorders(moved_prop, canvas)
            setTimeout(() => {
                clearAll(moved_prop)
            }, len * 100)
        }, 120)
        
    }

    function gameLose(){
    }

    snakeEngine()
}

letsPlay(game_zone, ctx, apple, snake)