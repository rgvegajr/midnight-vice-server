<% include ../partials/header %>
<!--<div class="container">-->
    <div class="row">
        <div class="col-md-3">
          <p class="lead">YelpCamp</p>
              <div class="list-group">
                <li class="list-group-item active">Info 1</li>
                <li class="list-group-item">Info 2</li>
                <li class="list-group-item">Info 3</li>
              </div>
              <div id="map">Map Goes Here</div>
        </div>            
        <div class="col-md-9">
            <div class="thumbnail">
                <img class="image-responsive" src="<%= campground.image %>">
                <div class="caption-full">
                    <h4 class="pull-right">$<%= campground.price %>/night</h4>
                    <h4><a><%= campground.name %></a></h4>
                    <p><%= campground.description %></p>
                    <p>
                        <em>Submitted By <%= campground.author.username %></em>
                    </p>
                    <% if(currentUser && campground.author.id.equals(currentUser._id)){ %>
                        <a class="btn btn-xs btn-warning" href="//<%= campground._id %>/edit">Edit</a>
                        <form class="delete-form" action="//<%= campground._id %>?_method=DELETE" method="POST">
                            <button class="btn btn-xs btn-danger">Delete</button>
                        </form>
                    <% }%>
                </div>
            </div>
            <div class="well">
                <div class="text-right">
                    <a class="btn btn-success" href="//<%= campground._id %>/comments/new">Add a new comment</a>
                </div>
                <hr>
                <% campground.comments.forEach(function(comment){  %>
                    <div class="row">
                        <div class="col-md-12">
                            <strong><%= comment.author.username %></strong>
                            <span class="pull-right">10 days ago</span>
                            <p>
                                <%= comment.text %>
                            </p>
                        <% if(currentUser && comment.author.id.equals(currentUser._id)){ %>
                            <a class="btn btn-xs btn-warning"
                                href="//<%=campground._id %>/comments/<%=comment._id %>/edit">
                                Edit
                            </a>
                            <form class="delete-form" action="//<%= campground._id %>/comments/<%= comment._id %>?_method=DELETE" method="POST">
                                <input type="submit" class="btn btn-xs btn-danger" value="Delete">
                            </form>
                        <% } %>
                        </div>
                    </div>
                <%  })  %>
            </div>    
        </div>
    </div>
<!--</div>-->

<script>
  function initMap() {
    var lat = <%= campground.lat %>;
    var lng = <%= campground.lng %>;
    var center = {lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center,
        scrollwheel: false
    });
    var contentString = `
      <strong><%= campground.name %><br />
      <%= campground.location %></strong>
      <p><%= campground.description %></p>
    `
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
        position: center,
        map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNqzyKqM09Z8ribX3nYa07pls2wnLSQLw&callback=initMap"></script>

<% include ../partials/footer %>
