import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-home-help',
  templateUrl: './home-help.component.html',
  styleUrls: ['./home-help.component.scss']
})
export class HomeHelpComponent implements OnInit {

  sections:any = [
    {
      title: 'Participa en una subasta',
      image: '/assets/img/illustrations/hammer.png',
      description: 'Busca los bienes más interesantes y encuentra el mejor precio',
      link: ''
    },
    {
      title: 'Cómo comprar',
      image: '/assets/img/illustrations/julia-card.png',
      description: 'Entérate del proceso para comprar lo que buscas de la manera más sencilla en Dorotea',
      link: ''
    },
    {
      title: 'Quiero vender',
      image: '/assets/img/illustrations/julia-phone.png',
      description: 'Encuentra cómo vender tus bienes de la manera más eficiente',
      link: ''
    },
    {
      title: 'Post venta',
      image: '/assets/img/illustrations/julia-question.png',
      description: 'Experimenta los beneficios que el Ecosistema de Dorotea tiene para ti: Financiación, Remodelación, validaciones.',
      link: ''
    },
    {
      title: 'FAQs',
      image: '/assets/img/illustrations/phone.png',
      description: 'Sección de preguntas frecuentes',
      link: ''
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
