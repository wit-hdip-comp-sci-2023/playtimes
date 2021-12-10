import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("User Credentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  _id: IdSpec,
  __v: Joi.number(),
}).label("User Details");

export const UserArray = Joi.array().items(UserSpec).label("User Array");

export const TrackSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"),
    artist: Joi.string().required().example("Beethoven"),
    duration: Joi.number().allow("").optional().example(12),
    playlistid: IdSpec,
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("Track");

export const TrackArraySpec = Joi.array().items(TrackSpec).label("Track Array");

export const PlaylistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    _id: IdSpec,
    tracks: TrackArraySpec,
    __v: Joi.number(),
  })
  .label("Playlist");

export const PlaylistArraySpec = Joi.array().items(PlaylistSpec).label("Playlist Array");
