var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ugly Camp",
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3L63dsLKkTQ-QqM1j6VjeLR3rSHRj-sYv7InsIT2FPXkeeWRa",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas turpis dui, vitae porttitor erat gravida et. Maecenas bibendum dapibus scelerisque. Cras dignissim, lorem non iaculis laoreet, tellus lorem volutpat purus, eget molestie lectus erat sed eros. Duis posuere et purus eget ultrices. Suspendisse maximus purus sed tempus gravida. Nam diam tellus, tempor accumsan commodo at, rutrum in quam. Vestibulum id tempor orci. Vestibulum sagittis nulla quis neque feugiat ullamcorper. Donec dignissim magna ac sem congue, sit amet gravida risus imperdiet. Etiam vulputate felis sed vulputate lobortis. Vestibulum cursus libero et egestas vehicula. Nulla sem dolor, rutrum sit amet faucibus non, porta eget purus. Duis eu hendrerit lorem, sit amet cursus lorem. Nam vel lectus magna. Morbi faucibus, mi ut luctus vehicula, ipsum nibh viverra purus, sed mattis felis libero sed enim."
    },
    {
        name: "stupid Camp",
        image: "http://www.active.com/Assets/nh_camping.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas turpis dui, vitae porttitor erat gravida et. Maecenas bibendum dapibus scelerisque. Cras dignissim, lorem non iaculis laoreet, tellus lorem volutpat purus, eget molestie lectus erat sed eros. Duis posuere et purus eget ultrices. Suspendisse maximus purus sed tempus gravida. Nam diam tellus, tempor accumsan commodo at, rutrum in quam. Vestibulum id tempor orci. Vestibulum sagittis nulla quis neque feugiat ullamcorper. Donec dignissim magna ac sem congue, sit amet gravida risus imperdiet. Etiam vulputate felis sed vulputate lobortis. Vestibulum cursus libero et egestas vehicula. Nulla sem dolor, rutrum sit amet faucibus non, porta eget purus. Duis eu hendrerit lorem, sit amet cursus lorem. Nam vel lectus magna. Morbi faucibus, mi ut luctus vehicula, ipsum nibh viverra purus, sed mattis felis libero sed enim."
    },
    {
        name: "dumb Camp",
        image: "http://az616578.vo.msecnd.net/files/2016/05/13/635987791255837195-1892917331_Camping-Near-The-Lake-Background-Wallpaper.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas turpis dui, vitae porttitor erat gravida et. Maecenas bibendum dapibus scelerisque. Cras dignissim, lorem non iaculis laoreet, tellus lorem volutpat purus, eget molestie lectus erat sed eros. Duis posuere et purus eget ultrices. Suspendisse maximus purus sed tempus gravida. Nam diam tellus, tempor accumsan commodo at, rutrum in quam. Vestibulum id tempor orci. Vestibulum sagittis nulla quis neque feugiat ullamcorper. Donec dignissim magna ac sem congue, sit amet gravida risus imperdiet. Etiam vulputate felis sed vulputate lobortis. Vestibulum cursus libero et egestas vehicula. Nulla sem dolor, rutrum sit amet faucibus non, porta eget purus. Duis eu hendrerit lorem, sit amet cursus lorem. Nam vel lectus magna. Morbi faucibus, mi ut luctus vehicula, ipsum nibh viverra purus, sed mattis felis libero sed enim."
    }
]

function seedDB() {
    Camp.remove({}, function (err) {
        console.log("removed!"); 

        data.forEach(function (seed) {
            Camp.create(seed, function (err, camp) {
                console.log("added a camp");
                Comment.create({
                    text: "yep this is a dumb camp",
                    author: "some person"
                }, function (err, comment) {
                    if (err) {
                        console.log(err);
                    } else {
                        camp.comments.push(comment);
                        camp.save();
                        console.log("created comment");
                    }                   
                });
            }) 
        });
    });

    

}

module.exports = seedDB;