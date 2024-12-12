import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  // Fetch loader data
  const data = useLoaderData();

  // Page structure without wrapping the entire page in Suspense
  return (
    <div className="listPage">
      {/* Filter renders immediately */}
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {/* Suspense only for posts list */}
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>

      {/* Map renders independently */}
      <div className="mapContainer">
        <Suspense fallback={<p>Loading map...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading map data</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
