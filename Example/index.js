
function createStore(reducer)
{
    let state = reducer(undefined,{});
    const subscribes = [];
    return{
        getState()
        {
            return state;
        },
        dispatch(action)
        {
            state = reducer(state,action);
            console.log(action);
            subscribes.forEach(subscribe => subscribe(subscribe));
        },
        subscribe(subscribe)
        {
            subscribes.push(subscribe);
        }
    }
}

const initState = 0;

function bankRe(state = initState,action)
{
    switch (action.type) {
        case "Nap":
         return state + action.cost;
        case "Rut":
         return state - action.cost;   
        default:
           return state;
    }
}

const store  = createStore(bankRe);

function Actionnap(cost)
{
    return{
        type: "Nap",
        cost
    }
}
function Actionrut(cost)
{
    return{
        type: "Rut",
        cost
    }
}

const nap = document.querySelector('#nap');
const rut = document.querySelector('#rut');

nap.addEventListener('click',()=>{
    store.dispatch(Actionnap(10));
});

rut.addEventListener('click',()=>{
    store.dispatch(Actionrut(10));
})

store.subscribe(()=>{
    render();
    console.log("Updated")
})

function render()
{
    const output = document.querySelector('#output');
    output.innerText = store.getState();
}

render();