

$(document).ready(function () {
    $('body').append('<div id="toTop" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-up"></span> Back to Top</div>');
    	$(window).scroll(function () {
			if ($(this).scrollTop() !== 0) {
				$('#toTop').fadeIn();
			} else {
				$('#toTop').fadeOut();
			}
		}); 
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value;

    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '97b26d4e8ed886bd89fa',
        client_secret: 'f5ebe96125addf1d85c64d0c72f810011da3401f'
      }
    }).done(function (user) {
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '97b26d4e8ed886bd89fa',
          client_secret: 'f5ebe96125addf1d85c64d0c72f810011da3401f',
          sort: 'created: asc',
          per_page: 20
        }
      }).done(function (repos) {
        $.each(repos, function (index, repo) {
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>:<br/><span class="fas fa-code-branch"></span> ${repo.description || "Description not available"}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
          <center>
          <h3 class=""></h3>
          <div class="alert alert-primary centerize">
          <span class="far fa-user-circle"></span>
          ${user.name}
</div>
          </center>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="label label-default">Public Repos: ${user.public_repos}</span>
              <span class="label label-primary">Public Gists: ${user.public_gists}</span>
              <span class="label label-success">Followers: ${user.followers}</span>
              <span class="label label-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company || "Not specified "}</li>
                <li class="list-group-item">Website/blog: <a href="${user.blog || "#"}" target="_blank">${user.blog || "Not specified"}</a></li>
                <li class="list-group-item">Location: ${user.location || "Not specified"}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header"><span class="fas fa-folder-open"></span> Latest Repositories</h3>
        <div id="repos"></div>
      `);
    });
  });
});
document.getElementById("resetBtn").style.visibility = "hidden";
document.getElementById("searchUser").addEventListener("input", (e) => {
  document.getElementById("resetBtn").style.visibility = "visible";
  if (e.target.value === "") {
    document.getElementById("resetBtn").style.visibility = "hidden";
    console.log(e.target.value)
  }else{
    document.getElementById("resetBtn").addEventListener(
      'click', () => { e.target.value = ""}
    )
  }
});
