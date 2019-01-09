import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  public page = 1;

  public nome_usuario: String = "Ana Ramos";

  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private MoovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  openLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  closeLoading() {
    this.loader.dismiss();
  }

  public somaDeDoisNumeros(num1: number, num2: number): void {
    // alert(num2 + num2); 
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.loaderMovies();
  }

  ionViewDidEnter() {
    this.loaderMovies();
  }

  OpenDetails(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++; 
    this.infiniteScroll = infiniteScroll;
    this.loaderMovies(true);
  }

  loaderMovies(newPage: boolean = false){
    this.openLoading();
    this.MoovieProvider.getLatesMoovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno =JSON.parse(response._body);

        if(newPage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          console.log(this.page);
          console.log(this.lista_filmes);
          this.infiniteScroll.complete();
        }else{
          this.lista_filmes = objeto_retorno.results;
        }

        console.log(objeto_retorno);
        this.closeLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.closeLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false
        }
      }
    )
  }


}