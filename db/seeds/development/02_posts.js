exports.seed = (knex, _) =>
  knex("posts")
    .del() // Deletes ALL existing entries
    // Insert post seeds
    .then(() =>
      knex("posts").insert([
        {
          title: "First Post",
          body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare fermentum mi, a luctus erat dapibus nec. Phasellus eleifend ac lorem eget iaculis. Nullam bibendum finibus turpis. Praesent tincidunt eros ex, ac efficitur felis mollis ut. Aenean nec bibendum lorem. Sed dui eros, facilisis eu interdum a, volutpat et justo. Cras consequat arcu ante, non suscipit tellus mattis ut. Pellentesque porttitor libero et neque dictum, egestas sodales augue tempus. Sed sit amet dolor vel arcu dignissim accumsan ut nec lectus. Donec tempor eu quam vel sagittis. Sed sit amet massa in dui porttitor venenatis eu ut ipsum.",
          user_id: 1
        },
        {
          title: "Second Post",
          body:
            "Sed eget neque sit amet ex tincidunt tincidunt. Donec et dui tempus, consectetur elit ac, elementum turpis. Suspendisse et eros orci. Praesent maximus, lectus vitae cursus hendrerit, lectus tellus porta lorem, et pharetra nulla ex ultrices eros. Maecenas venenatis luctus neque eu hendrerit. In porta, elit quis consequat varius, enim purus cursus urna, ut gravida leo tortor accumsan dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur quis est elementum, tincidunt purus in, accumsan tellus.",
          user_id: 1
        },
        {
          title: "Third Post",
          body:
            "ras non ultrices felis. Pellentesque eget nisi sit amet ligula hendrerit tincidunt. Etiam viverra mattis quam, eu mollis erat vehicula at. Nulla tincidunt pulvinar leo in cursus. Cras sagittis odio vel imperdiet accumsan. Quisque sed hendrerit ipsum. Curabitur et maximus arcu. Ut consectetur dolor at semper ultricies.",
          user_id: 2
        },
        {
          title: "Fourth Post",
          body:
            "Nam porttitor, elit non dignissim sodales, libero quam blandit urna, sed ullamcorper neque magna non dui. Curabitur suscipit dui eu risus malesuada, vitae aliquet libero laoreet. In a urna tristique, tincidunt ex ac, tristique tellus. Ut nec dolor cursus, vestibulum lectus et, vestibulum orci. Mauris dignissim urna a sapien pulvinar porttitor.",
          user_id: 3
        }
      ])
    );
