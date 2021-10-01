import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Postlist } from 'src/app/service/interface';

const Parse = require('parse');

const PostList = Parse.Object.extend("example7");
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
  titleisedit: boolean = false;
  messageisedit: boolean = false;
  edittitle: string = '';
  editmessage: string = '';
  currentUser = Parse.User.current();
  writer: any;
  data: any;
  constructor() { }

  ngOnInit(): void {
    this.find()
    this.getUserList();
  }

  async find() {
    let query = new Parse.Query(PostList);
    // query.include('writer');
    await query.find().then((result: any) => {
      this.postlist = result;
      this.postlist.map((i: any) => {
        if(i.get('writer')){
        i.set("onwer",i.get('writer').attributes.username)
        console.log(i)
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

      postList.set("writer", this.writer);
      await postList.save().then(() => {
        this.title = '';
        this.message = '';
      });
      this.find();
    }
  }

  async getUserList() {
    let user = new Parse.Query(User);
    // query.ascending("title");
    user.equalTo("objectId", this.currentUser.id)
    await user.first().then((result: any) => {
      this.writer = result
      console.log(this.writer)
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
}
