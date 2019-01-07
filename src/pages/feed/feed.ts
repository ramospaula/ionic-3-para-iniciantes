import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Ana Ramos",
    data: "November 5, 1955",
    descricao: "estou criando um app incrível...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();


  public nome_usuario: String = "Ana Ramos";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private MoovieProvider: MoovieProvider
  ) {
  }

  public somaDeDoisNumeros(num1: number, num2: number): void {
    // alert(num2 + num2); 
  }

  ionViewDidLoad() {
    this.MoovieProvider.getLatesMoovies().subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno =JSON.parse(response._body);
        this.lista_filmes = objeto_retorno.results;
        console.log(objeto_retorno);
      }, error => {
        console.log(error);
      }
    )
  }

}
