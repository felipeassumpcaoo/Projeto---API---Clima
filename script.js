document.querySelector('.busca').addEventListener('submit', async (event)=>{
    // Impedindo que o formulário seja enviado;
     event.preventDefault();
     
     // Pegando as informações que o usuário digitou
     let input = document.querySelector('#searchInput').value;
     //fazendo o teste pelo console.log
     //console.log(input);
       
     // Verificando o se usuário digitou alguma coisa
     if(input !== '') {
          clearInfo();
          ShowWarning('Carregando...');  
          // Montando a url da requisição e usando template string e encodeUri   
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d37b18335834100094e4722549ab2031&units=metrick&lang=pt_br`;
         
          // Guardando o resultado da consulta;
          let results = await fetch(url);
          // Tranformando o resultado em Json
          let json = await results.json(); 
  
          // Verificando se foi digitado uma cidade ou pais que existe
         if(json.cod === 200){
             
           // Montando as informações que devem aparecer
           ShowInfo({
             name:json.name,
             country:json.sys.country,
             temp:json.main.temp,
             tempIcon:json.weather[0].icon,
             windSpeed:json.wind.speed,
             windAngle: json.wind.deg
     
           });
            
         } else{
           
           clearInfo();
            ShowWarning('Não encontramos esta localização!');
         }
     } else {
        clearInfo();
     }
   
  
  });
  
  // Função para mostrar as informações
  
  function ShowInfo(json) {
    ShowWarning('');
    
     //Preenchendo as informações.
       document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
       document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
       document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
       document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
       document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
  
  
    //Mostrando o Resultado
    document.querySelector('.resultado').style.display = 'block';
  
  }
  
  
  //Função de limpeza de pesquisa
  
  function clearInfo() {
     ShowWarning('');
     document.querySelector('.resultado').style.display = 'none';
  }
  
  //Função de Aviso
  function ShowWarning(msg) {
     document.querySelector('.aviso').innerHTML = msg;
  }