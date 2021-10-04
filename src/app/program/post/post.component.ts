import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Postlist } from 'src/app/service/interface';

const Parse = require('parse');

const PostList = Parse.Object.extend("example7");
const Comment = Parse.Object.extend("example8");
const query = new Parse.Query(PostList);
const User = Parse.Object.extend("User");


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  title: string = '';
  message: string = '';
  postlist: Postlist[] = [];
  posttitle: string = '';
  isedit: boolean = false;
  title_display: boolean[] = [];
  message_display: boolean[] = [];
  comment_display: boolean[] = [];
  titleisedit: boolean = false;
  messageisedit: boolean = false;
  edittitle: string = '';
  editmessage: string = '';
  currentUser = Parse.User.current();
  userName: any;
  data: any;
  like: boolean = false;
  isEditComment:any =  false;
  commentMessage: string = ''
  
  commentList:string[] = [];
  constructor() { }

  ngOnInit(): void {
    this.find()
    this.getUserList();
  }

  async find() {
    let query = new Parse.Query(PostList);
    await query.find().then((result: any) => {
      this.postlist = result;
      this.postlist.map(async (i: any) => {
        let commentList: any[] = [];
        let commentIM = i.relation('comment').query();
        await commentIM.find().then((res: any) => {
          if (res != undefined) {
              res.forEach( (el:any) => {
                  this.commentList.push(el.attributes.message)
              });
          }
        });
        i.set('commentMessage',this.commentList);
        console.log(this.commentList)
        this.commentList=[];
        commentIM = i.relation('comment').query();
        commentIM.equalTo('user', this.userName)
        commentIM.first().then((result: any) => {
          if (result != undefined) {
              i.set('commentLike',result.attributes.like);
          }
        });
        i.set('commentIm', commentList);
        if (i.get('writer')) {
          i.set('onwer', i.get('writer').attributes.username);
        }
      })
    }, (error: any) => {
    });


  }

  async post() {
    let postList = new PostList();
    if (this.message.trim() != '' || this.title.trim() != '') {
      postList.set("title", this.title);
      postList.set("message", this.message);
      postList.set("user", this.currentUser.id);

      postList.set("writer", this.userName);
      await postList.save().then(() => {
        this.title = '';
        this.message = '';
      });
      this.find();
    }
  }

  //抓取目前登入的user資料 
  //用於後續存在Post(example7)及Comment(example8)資料表的user(pointer)裡
  async getUserList() {
    let user = new Parse.Query(User);
    user.equalTo("objectId", this.currentUser.id)
    await user.first().then((result: any) => {
      this.userName = result
    })
  }

  async delete(item: any) {
    let postList = new PostList();
    postList = await query.get(item.id);
    await postList.destroy();
    this.find();
  }

  async update(item: any, index: NumberFormatStyle) {
    let postList = new PostList();
    postList = await query.get(item.id);
    postList.set('title', this.edittitle);
    postList.set('message', this.editmessage);
    postList.save().then(() => {
      this.title_display[index] = false;
      this.message_display[index] = false;
      this.titleisedit = false;
      this.messageisedit = false;
    });
  }

  edit(item: any, index: number, focus?: string) {
    if (item.attributes.user == this.currentUser.id) {
      this.edittitle = item.attributes.title;
      this.editmessage = item.attributes.message;
      switch (focus) {
        case 'title':
          this.titleisedit = true;
          this.title_display[index] = true;
          break;
        case 'message':
          this.messageisedit = true;
          this.message_display[index] = true;
          break;
        default:
          this.titleisedit = true;
          this.title_display[index] = true;
          this.messageisedit = true;
          this.message_display[index] = true;
      }
    }
  }

  async setlike(item: any) {
    let postId = await this.checkCommetHaveThisPost(item)
    let comment = new Comment();
    if (postId == '') {
      comment.set('like', true);
      comment.set('user', this.userName);
      comment.set('post', item);
      await comment.save();
    } else {
      let comment_list = new Parse.Query(Comment);
      comment = await comment_list.get(postId);
      comment.set('like', !comment.attributes.like);
      await comment.save();
    }
    let postList = await query.get(comment.get('post').id);
    let postList_relation = postList.relation('comment');
    postList_relation.add(comment);
    postList.save();

    this.find();
  }

  async checkCommetHaveThisPost(item: any) {
    let result_postId: string = '';
    let comment_list = new Parse.Query(Comment);
    comment_list.equalTo('post', item);
    comment_list.equalTo('user', this.userName)
    await comment_list.first().then((result: any) => {
      if (result != undefined) {
        result_postId = result.id;
      }
    })
    return result_postId;
  }

  addComment(item:any,index:number){
    this.isEditComment = !this.isEditComment; 
    this.comment_display[index] = true;
  }

  async sendComment(item:any,index:number){
    let comment = new Comment();
    comment.set('message',this.commentMessage)
    comment.set('user', this.userName);
    comment.set('post', item);
    await comment.save().then(()=>{
      this.commentMessage='';
      this.isEditComment = false; 
      this.comment_display[index] = false;
    });
    let postList = await query.get(comment.get('post').id);
    let postList_relation = postList.relation('comment');
    postList_relation.add(comment);
    await postList.save();

    this.find();
  }

  cancel(index:number){
    this.isEditComment = false; 
    this.comment_display[index] = false;
  }
  
}
