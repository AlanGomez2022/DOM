
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  CLASES Y OBJETOS                                                      //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Persona{
    constructor(name,numero){
        this.nombre= name;
        this.dni=numero;
    }
    mostrarse(){
        return ("Nombre: "+this.nombre+ "  -   DNI: "+this.dni);
    }
}
class sector{
    constructor(nombre,precio){
        this.name=nombre;
        this.price=precio;
    }
    mostrarse(){
        return("Nombre: "+this.name+" Precio: "+this.price);
    }
}
class compraTicket{
    constructor(persona,sector){
        this.personas=[persona];
        this.sector=sector;
        this.subtotal=0;
        this.total=0;
        
    }
    agregarPersona(persona){
        this.personas.push(persona);
    }
    calcularCosto(){
        this.subtotal= this.sector.price*(this.personas.length)

    }
    calcularCostoConIva(){
        this.total=this.subtotal*iva+this.subtotal        
    }
    getPersonas(){
        return this.personas;
    }
    getSector(){
        return this.sector.name;
    }
    getPrecioSector(){
        return this.sector.price
    }
    getSubtotal(){
        return this.subtotal;
    }
    getTotal(){
        return this.total
    }
    
}

// FUNCIONES QUE USA EL PROGRAMA PRINCIPAL/////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validarSector(sectores){
    let control=0;
    let lugar=0;
       while(typeof(control)==="number"){
        lugar=parseInt(prompt("Ingrese el numero del sector que desea:\n 1- Platea Preferida ($"+plateaPreferida.price+" + IVA) \n 2- Platea ($"+platea.price+" + IVA) \n 3- Super Pullman($"+superPulman.price+" + IVA) \n 4- Platea C y L ($"+plateaCyL.price+" + IVA) \n 5- Pullman Lateral ($"+pullmanLateral.price+" + IVA) \n 6- Cabecera ($"+cabecera.price+" + IVA)"));
        if ((typeof(lugar)==="number")&&(lugar>0&& lugar<=sectores.length)){
            lugar=lugar-1;
            return sectores[lugar];
        }else{
            alert ("ERROR!!! Opcion incorrecta!! vuelva a ingresar una opcion");
            control=0;
        }
        }
    return;
}
function validarCantEntradas(){
    let control=0;
    let cantidad=parseInt(prompt("Ingrese la cantidad de entradas que desea comprar: "));
    while(typeof(control)==="number"){
        if ((typeof(cantidad)==="number")&&(cantidad>0)){
           return cantidad;
        }else{
            alert("ERROR!!! Opcion incorrecta!! ")
            cantidad=parseInt(prompt("Vuelva a ingresar una cantidad de entradas a comprar: "));
        }
    }
}
function mostrarCompra(ticket){
    let personas=ticket.getPersonas()
    let cantPersonas=personas.length
    let sector=ticket.getSector()
    let precioSector=ticket.getPrecioSector()
    let subtotal=ticket.getSubtotal()
    let total=ticket.getTotal()
    let caja=document.getElementById("cajaCompra")
    let titulo=document.createElement("h2")
    titulo.className="cont"
    titulo.innerHTML=`Se ha generado una compra por ${cantPersonas} entradas, que corresponden a:`
    caja.append(titulo)
    personas.map((persona,index)=>{
        let elemento=document.createElement("h3")
        let textoPersona=persona.mostrarse()
        elemento.className='contChico'
        elemento.innerHTML=`${textoPersona} `
        caja.append(elemento)
        let subelemento=document.createElement('h4')
        subelemento.className="contMasChico"
        subelemento.innerHTML=`${sector} -  Valor: $ ${precioSector}  + IVA`       
        caja.append(subelemento)
    })
    let subFinal=document.createElement('h3')
    subFinal.className="contChico"
    let final=document.createElement('h2')
    final.className="cont"
    subFinal.innerHTML=`Subtotal: $  ${subtotal}`
    caja.append(subFinal)
    final.innerHTML=`TOTAL A PAGAR: $ ${total}`
    caja.append(final)
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  P  R  O  G  R  A  M  A         P  R  I  N  C  I  P  A  L                                            //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// creo los lugares como objetos //
let plateaPreferida= new sector ('Platea Preferida', 7000);
let platea= new sector ('Platea', 5500)
let superPulman= new sector ('Super Pullman', 5000)
let plateaCyL= new sector ('Platea Platea C y L', 4000)
let pullmanLateral= new sector ('Pullman Lateral', 3500)
let cabecera= new sector ('Cabecera', 3000)
// Creo un estadio//
let lunaPark=[ plateaPreferida, platea, superPulman, plateaCyL, pullmanLateral, cabecera ]
let iva=0.21;

alert("Comencemos con el proceso de reserva de entradas");
let nombre=prompt("Ingrese su nombre y apellido: ");
let dni=prompt("ingrese su numero de DNI: ");
let individuo= new Persona(nombre,dni);
let lugar=(validarSector(lunaPark));
let compra= new compraTicket(individuo,lugar);
let cantEntradas=validarCantEntradas();

if (cantEntradas===1){
    compra.calcularCosto();
    compra.calcularCostoConIva();
    mostrarCompra(compra)
}else{
    for(let i=1;i<cantEntradas;i++){
        let personita= new Persona()
        personita.nombre=prompt("Ingrese el nombre de la siguiente persona que lo acompañará: ");
        personita.dni=prompt("Ingrese el DNI de esa persona:");
        compra.agregarPersona(personita);
        
    }
    compra.calcularCosto();
    compra.calcularCostoConIva();
    mostrarCompra(compra);
}


