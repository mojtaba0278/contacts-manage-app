const x=2;
console.log(x+5);


const friend_list=[
    "amir",
    {
        friends:[
            "ali",
            "mahdi",
            "iman"
        ]

    }
]

console.log("original:",friend_list);

const friend_list_copy2=JSON.parse(JSON.stringfy(friend_list));
