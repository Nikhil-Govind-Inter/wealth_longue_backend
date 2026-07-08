import type { Schema, Struct } from '@strapi/strapi';

export interface AboutComponentAboutBanner extends Struct.ComponentSchema {
  collectionName: 'components_about_component_about_banners';
  info: {
    displayName: 'About Banner';
    icon: 'calendar';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    media: Schema.Attribute.Component<'utils.media', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutComponentAboutCOreSection extends Struct.ComponentSchema {
  collectionName: 'components_about_component_about_c_ore_sections';
  info: {
    displayName: 'About Core Section';
    icon: 'connector';
  };
  attributes: {
    core_values: Schema.Attribute.Component<
      'about-component.core-values',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutComponentAboutTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_about_component_about_team_sections';
  info: {
    displayName: 'Teams';
    icon: 'connector';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    fb_url: Schema.Attribute.String;
    linkedin_url: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    profile: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface AboutComponentCoreValues extends Struct.ComponentSchema {
  collectionName: 'components_about_component_core_values';
  info: {
    displayName: 'Core Values';
    icon: 'attachment';
  };
  attributes: {
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutComponentMissionVission extends Struct.ComponentSchema {
  collectionName: 'components_about_component_mission_vissions';
  info: {
    displayName: 'Mission Vission';
    icon: 'book';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutComponentTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_about_component_team_sections';
  info: {
    displayName: 'Team Section';
    icon: 'book';
  };
  attributes: {
    teams: Schema.Attribute.Component<
      'about-component.about-team-section',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApproachComponentAlternatveTypes
  extends Struct.ComponentSchema {
  collectionName: 'components_approach_component_alternatve_types';
  info: {
    displayName: 'Alternatve Types';
    icon: 'cup';
  };
  attributes: {
    box_description: Schema.Attribute.Blocks;
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
    enquire_button: Schema.Attribute.Component<'utils.link', false>;
    is_button: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApproachComponentApproachesWeProvide
  extends Struct.ComponentSchema {
  collectionName: 'components_approach_component_approaches_we_provides';
  info: {
    displayName: 'Approaches We Provide';
    icon: 'brush';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContcatSectionContactInformationSection
  extends Struct.ComponentSchema {
  collectionName: 'components_contcat_section_contact_information_section_s';
  info: {
    displayName: 'Contact Information Section ';
    icon: 'calendar';
  };
  attributes: {
    contact_items: Schema.Attribute.Component<
      'contcat-section.contact-items',
      true
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContcatSectionContactItems extends Struct.ComponentSchema {
  collectionName: 'components_contcat_section_contact_items';
  info: {
    displayName: 'Contact Items';
    icon: 'car';
  };
  attributes: {
    address: Schema.Attribute.Blocks & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContcatSectionFormSection extends Struct.ComponentSchema {
  collectionName: 'components_contcat_section_form_sections';
  info: {
    displayName: 'Form Section';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    form_title: Schema.Attribute.String & Schema.Attribute.Required;
    map_link: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
    icon: 'crop';
  };
  attributes: {
    address: Schema.Attribute.RichText & Schema.Attribute.Required;
    copyright: Schema.Attribute.Blocks & Schema.Attribute.Required;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    navigations: Schema.Attribute.Component<'layout.footer-navigations', true>;
    office_location: Schema.Attribute.Component<
      'layout.office-locations',
      false
    >;
    social_media: Schema.Attribute.Component<'layout.social-media', false>;
  };
}

export interface GlobalHeader extends Struct.ComponentSchema {
  collectionName: 'components_global_headers';
  info: {
    displayName: 'Header';
    icon: 'bulletList';
  };
  attributes: {
    base_url: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    nav_links: Schema.Attribute.Component<'utils.link', true>;
  };
}

export interface GlobalWidgets extends Struct.ComponentSchema {
  collectionName: 'components_global_widgets';
  info: {
    displayName: 'widgets';
    icon: 'dashboard';
  };
  attributes: {
    icon: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    is_enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    is_external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeComponentHomeAbout extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_abouts';
  info: {
    displayName: 'Home About';
    icon: 'chartBubble';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false>;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    spec_items: Schema.Attribute.Component<
      'home-component.specifications',
      true
    > &
      Schema.Attribute.Required;
    sub_title: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_banners';
  info: {
    displayName: 'Home Banner';
    icon: 'brush';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    media: Schema.Attribute.Component<'utils.media-with-type', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeService extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_services';
  info: {
    displayName: 'Home Service';
    icon: 'command';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    service_items: Schema.Attribute.Component<
      'home-component.service-items',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_testimonials';
  info: {
    displayName: 'Home Testimonials';
    icon: 'cup';
  };
  attributes: {
    testimonial_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial-item.testimonial-item'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentNewsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_component_news_sections';
  info: {
    displayName: 'News Section';
    icon: 'calendar';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false>;
    news_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::news-and-blog.news-and-blog'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentServiceItems extends Struct.ComponentSchema {
  collectionName: 'components_home_component_service_items';
  info: {
    displayName: 'Service Items';
    icon: 'cast';
  };
  attributes: {
    icons: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_home_component_specifications';
  info: {
    displayName: 'Specifications';
    icon: 'arrowLeft';
  };
  attributes: {
    sufix: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface HomeComponentTestimonialItems extends Struct.ComponentSchema {
  collectionName: 'components_home_component_testimonial_items';
  info: {
    displayName: 'Testimonial Items';
    icon: 'bulletList';
  };
  attributes: {
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quotes: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutFooterNavigations extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_navigations';
  info: {
    displayName: 'Footer Navigations';
    icon: 'cursor';
  };
  attributes: {
    nav_title: Schema.Attribute.String & Schema.Attribute.Required;
    navigation_links: Schema.Attribute.Component<'utils.link', true> &
      Schema.Attribute.Required;
  };
}

export interface LayoutOfficeItems extends Struct.ComponentSchema {
  collectionName: 'components_layout_office_items';
  info: {
    displayName: 'Office Items';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean;
    link: Schema.Attribute.String;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface LayoutOfficeLocations extends Struct.ComponentSchema {
  collectionName: 'components_layout_office_locations';
  info: {
    displayName: 'Office Locations';
    icon: 'cast';
  };
  attributes: {
    office_items: Schema.Attribute.Component<'layout.office-items', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutSocialItems extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_items';
  info: {
    displayName: 'Social Items';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.String;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface LayoutSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_medias';
  info: {
    displayName: 'Social Media';
    icon: 'twitter';
  };
  attributes: {
    items: Schema.Attribute.Component<'layout.social-items', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TestimonialComponentTestimonialSection
  extends Struct.ComponentSchema {
  collectionName: 'components_testimonial_component_testimonial_sections';
  info: {
    displayName: 'Testimonial Section';
  };
  attributes: {
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_path: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsMedia extends Struct.ComponentSchema {
  collectionName: 'components_utils_media';
  info: {
    displayName: 'Media Without Type';
    icon: 'collapse';
  };
  attributes: {
    desktop_media_path: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    mobile_media_path: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
  };
}

export interface UtilsMediaWithType extends Struct.ComponentSchema {
  collectionName: 'components_utils_media_with_types';
  info: {
    displayName: 'Media With Type';
    icon: 'database';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_desktop_path: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    media_mobile_path: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    media_type: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface UtilsSIngleMediaWIthType extends Struct.ComponentSchema {
  collectionName: 'components_utils_s_ingle_media_w_ith_types';
  info: {
    displayName: 'SIngle Media WIth Type';
    icon: 'book';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_path: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    media_type: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
  };
}

export interface UtilsSIngleMediaWithoutTYpe extends Struct.ComponentSchema {
  collectionName: 'components_utils_s_ingle_media_without_t_ypes';
  info: {
    displayName: 'SIngle Media Without Type';
    icon: 'briefcase';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_path: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-component.about-banner': AboutComponentAboutBanner;
      'about-component.about-c-ore-section': AboutComponentAboutCOreSection;
      'about-component.about-team-section': AboutComponentAboutTeamSection;
      'about-component.core-values': AboutComponentCoreValues;
      'about-component.mission-vission': AboutComponentMissionVission;
      'about-component.team-section': AboutComponentTeamSection;
      'approach-component.alternatve-types': ApproachComponentAlternatveTypes;
      'approach-component.approaches-we-provide': ApproachComponentApproachesWeProvide;
      'contcat-section.contact-information-section': ContcatSectionContactInformationSection;
      'contcat-section.contact-items': ContcatSectionContactItems;
      'contcat-section.form-section': ContcatSectionFormSection;
      'global.footer': GlobalFooter;
      'global.header': GlobalHeader;
      'global.widgets': GlobalWidgets;
      'home-component.home-about': HomeComponentHomeAbout;
      'home-component.home-banner': HomeComponentHomeBanner;
      'home-component.home-service': HomeComponentHomeService;
      'home-component.home-testimonials': HomeComponentHomeTestimonials;
      'home-component.news-section': HomeComponentNewsSection;
      'home-component.service-items': HomeComponentServiceItems;
      'home-component.specifications': HomeComponentSpecifications;
      'home-component.testimonial-items': HomeComponentTestimonialItems;
      'layout.footer-navigations': LayoutFooterNavigations;
      'layout.office-items': LayoutOfficeItems;
      'layout.office-locations': LayoutOfficeLocations;
      'layout.social-items': LayoutSocialItems;
      'layout.social-media': LayoutSocialMedia;
      'testimonial-component.testimonial-section': TestimonialComponentTestimonialSection;
      'utils.link': UtilsLink;
      'utils.media': UtilsMedia;
      'utils.media-with-type': UtilsMediaWithType;
      'utils.s-ingle-media-w-ith-type': UtilsSIngleMediaWIthType;
      'utils.s-ingle-media-without-t-ype': UtilsSIngleMediaWithoutTYpe;
    }
  }
}
