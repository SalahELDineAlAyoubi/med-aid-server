const requests =new Map();

let newId = 1;

const request ={
    id:1,
    name: 'Ginigival',
    dosage: 'dosage',
    type: 'Bottle',
    expirationDate: new Date('Decembre 27, 2030'),   
};

requests.set(request.id, request);

function getAllRequests(){
    return Array.from(requests.values());
}
function addNewRequests(request){
    newId++;
    const newRequest = Object.assign({}, medicine, {id: newId});
    requests.set(newId, newMedicine);
    return newRequest;
}
module.exports ={
    getAllRequests,
    addNewRequests
}